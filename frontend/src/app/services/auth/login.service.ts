import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Login, LoginResponse} from '../../models/login.model';
import { map, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/auth/login';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  /**
   *  @param loginData Datos del formulario de inicio de sesión
   *  @returns Observable con la respuesta del servidor (token JWT)
   */
  login(LoginData: Login): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(this.apiUrl, LoginData, this.httpOptions)
    .pipe(
      map((response: LoginResponse) => {
        if (response.access_token) {
          localStorage.setItem('access_token', response.access_token);
          console.log('Usuario logueado exitosamente');
        }
        return response;
      }),
      catchError(this.handleError.bind(this))
    );
}

  /**
   * Maneja errores de la petición HTTP
   * @param error Error de la petición
   * @returns Observable con el error
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}