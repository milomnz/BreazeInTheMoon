// register.model.ts

/**
 * Modelo para el formulario de registro de usuario
 * Representa los datos que se capturan en el frontend
 */
export interface RegisterFormModel {
  username: string;     // Nombre de usuario (corresponde a 'nombre' en el backend)
  password: string;     // Contraseña en texto plano
  numberPhone: string;  // Número de teléfono (corresponde a 'telefono' en el backend)
  email: string;        // Correo electrónico (corresponde a 'correo' en el backend)
}

/**
 * Modelo para la petición de registro al backend
 * Se mapea desde RegisterFormModel para coincidir con el DTO del backend
 */
export interface RegisterRequestModel {
  nombre: string;       // Nombre del usuario    rm)
  telefono: string;     // Teléfono de contacto
  correo: string;       // Correo electrónico
  contrasena: string;   // Contraseña en texto plano
}

/**
 * Modelo para la respuesta del backend después del registro
 */
export interface RegisterResponseModel {
  access_token: string; // JWT token retornado tras registro exitoso
}

/**
 * Modelo de error para el registro
 */
export interface RegisterErrorModel {
  message: string;      // Mensaje de error del backend
  statusCode: number;   // Código de estado HTTP
  error?: string;       // Tipo de error (opcional)
}

/**
 * Clase utilitaria para mapear entre modelos
 */
export class RegisterModelMapper {
  /**
   * Convierte los datos del formulario al formato esperado por el backend
   * @param formData Datos del formulario de registro
   * @returns Objeto con formato para enviar al backend
   */
  static toRequestModel(formData: RegisterFormModel, apellido: string = ''): RegisterRequestModel {
    return {
      nombre: formData.username,
      telefono: formData.numberPhone,
      correo: formData.email,
      contrasena: formData.password
    };
  }

  /**
   * Valida que los datos del formulario sean válidos
   * @param formData Datos del formulario
   * @returns true si los datos son válidos
   */
  static isValidFormData(formData: RegisterFormModel): boolean {
    return !!(
      formData.username?.trim() &&
      formData.password?.trim() &&
      formData.numberPhone?.trim() &&
      formData.email?.trim() &&
      this.isValidEmail(formData.email)
    );
  }

  /**
   * Valida formato de email
   * @param email Email a validar
   * @returns true si el email es válido
   */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}