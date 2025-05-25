import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError, map } from 'rxjs';
import { 
  RegisterFormModel, 
  RegisterRequestModel, 
  RegisterResponseModel, 
  RegisterErrorModel,
  RegisterModelMapper 
} from '../../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/auth/register'; // URL corregida basada en tu controlador
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Registra un nuevo usuario en el sistema
   * @param registerData Datos del formulario de registro
   * @returns Observable con la respuesta del servidor (token JWT)
   */
  register(registerData: RegisterFormModel): Observable<RegisterResponseModel> {
    // Convertir datos del formulario al formato esperado por el backend
    const requestData: RegisterRequestModel = RegisterModelMapper.toRequestModel(registerData);
    
    return this.http.post<RegisterResponseModel>(this.apiUrl, requestData, this.httpOptions)
      .pipe(
        map((response: RegisterResponseModel) => {

          if (response.access_token) {
            // localStorage.setItem('access_token', response.access_token);
            console.log('Usuario registrado exitosamente');
          }
          return response;
        }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Verifica si un correo electrónico ya está registrado
   * @param email Correo a verificar
   * @returns Observable<boolean> - true si está disponible, false si ya existe
   */
  checkEmailAvailability(email: string): Observable<boolean> {
    const checkUrl = `${this.apiUrl.replace('/register', '/check-email')}?email=${encodeURIComponent(email)}`;
    
    return this.http.get<{available: boolean}>(checkUrl, this.httpOptions)
      .pipe(
        map(response => response.available),
        catchError(() => {
          // Si el endpoint no existe, asumimos que el email está disponible
          // La validación real se hará en el registro
          return throwError(() => new Error('No se pudo verificar la disponibilidad del email'));
        })
      );
  }

  /**
   * Maneja los errores HTTP y los convierte en errores tipados
   * @param error Error HTTP recibido
   * @returns Observable que emite un RegisterErrorModel
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorModel: RegisterErrorModel;

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de red
      errorModel = {
        message: 'Error de conexión. Por favor, verifica tu conexión a internet.',
        statusCode: 0,
        error: 'NetworkError'
      };
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 400:
          errorModel = {
            message: error.error?.message || 'Los datos proporcionados no son válidos.',
            statusCode: 400,
            error: 'BadRequest'
          };
          break;
        
        case 401:
          errorModel = {
            message: error.error?.message || 'El correo electrónico ya está registrado.',
            statusCode: 401,
            error: 'Unauthorized'
          };
          break;
        
        case 409:
          errorModel = {
            message: 'El correo electrónico ya está en uso.',
            statusCode: 409,
            error: 'Conflict'
          };
          break;
        
        case 422:
          errorModel = {
            message: 'Los datos del formulario contienen errores de validación.',
            statusCode: 422,
            error: 'UnprocessableEntity'
          };
          break;
        
        case 500:
          errorModel = {
            message: 'Error interno del servidor. Por favor, intenta más tarde.',
            statusCode: 500,
            error: 'InternalServerError'
          };
          break;
        
        case 503:
          errorModel = {
            message: 'El servicio no está disponible temporalmente.',
            statusCode: 503,
            error: 'ServiceUnavailable'
          };
          break;
        
        default:
          errorModel = {
            message: `Error inesperado: ${error.status}. Por favor, contacta al soporte.`,
            statusCode: error.status,
            error: 'UnknownError'
          };
      }
    }

    console.error('Error en RegisterService:', errorModel);
    return throwError(() => errorModel);
  }

  /**
   * Valida los datos antes de enviarlos al servidor
   * @param registerData Datos del formulario
   * @returns true si los datos son válidos
   */
  validateRegisterData(registerData: RegisterFormModel): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!registerData.username?.trim()) {
      errors.push('El nombre de usuario es requerido');
    } else if (registerData.username.trim().length < 2) {
      errors.push('El nombre debe tener al menos 2 caracteres');
    }

    if (!registerData.email?.trim()) {
      errors.push('El correo electrónico es requerido');
    } else if (!RegisterModelMapper.isValidFormData(registerData)) {
      errors.push('El formato del correo electrónico no es válido');
    }

    if (!registerData.password?.trim()) {
      errors.push('La contraseña es requerida');
    } else if (registerData.password.length < 6) {
      errors.push('La contraseña debe tener al menos 6 caracteres');
    }

    if (!registerData.numberPhone?.trim()) {
      errors.push('El número de teléfono es requerido');
    } else if (!/^\+?[1-9]\d{1,14}$/.test(registerData.numberPhone)) {
      errors.push('El formato del número de teléfono no es válido');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Obtiene la URL base de la API
   * @returns string con la URL base
   */
  getApiUrl(): string {
    return this.apiUrl;
  }

  /**
   * Verifica si el servicio está disponible
   * @returns Observable<boolean>
   */
  checkServiceHealth(): Observable<boolean> {
    const healthUrl = this.apiUrl.replace('/auth/register', '/health');
    
    return this.http.get(healthUrl, { ...this.httpOptions, responseType: 'text' })
      .pipe(
        map(() => true),
        catchError(() => throwError(() => false))
      );
  }
}