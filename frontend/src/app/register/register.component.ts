import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RegisterFormModel } from '../models/register.model';
import { RegisterService } from '../services/auth/register.service';
import { RouterModule } from '@angular/router'; // Asegúrate de importar Router si lo necesitas

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  loginForm: FormGroup; 
  isLoading = false;

  constructor(
    private fb: FormBuilder, 
    private registerService: RegisterService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      numberPhone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const formData: RegisterFormModel = this.loginForm.value;
      
      // Validación adicional con el servicio
      const validation = this.registerService.validateRegisterData(formData);
      if (!validation.isValid) {
        this.showValidationErrorsFromService(validation.errors);
        return;
      }

      this.isLoading = true;
      
      try {
        // Mostrar loading
        Swal.fire({
          title: 'Registrando usuario...',
          text: 'Por favor espera',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // Llamar al servicio de registro
        this.registerService.register(formData).subscribe({
          next: async (response) => {
            // Cerrar loading
            Swal.close();
            
            // Mostrar éxito
            await this.showSuccessAlert('¡Registro exitoso!', '¡Bienvenido! Tu cuenta ha sido creada correctamente.');
            
            // Resetear formulario
            this.loginForm.reset();
            
            // Redirigir al dashboard o login
            // this.router.navigate(['/login']);
          },
          error: (error) => {
            // Cerrar loading
            Swal.close();
            this.handleRegistrationError(error);
          },
          complete: () => {
            this.isLoading = false;
          }
        });
        
      } catch (error: any) {
        // Cerrar loading si hay error antes de la suscripción
        Swal.close();
        this.handleRegistrationError(error);
        this.isLoading = false;
      }
    } else {
      this.showValidationErrors();
    }
  }

  /**
   * Verifica disponibilidad del email en tiempo real
   * @param email Email a verificar
   */
  async checkEmailAvailability(email: string) {
    if (email && this.loginForm.get('email')?.valid) {
      try {
        this.registerService.checkEmailAvailability(email).subscribe({
          next: (isAvailable) => {
            if (!isAvailable) {
              this.loginForm.get('email')?.setErrors({ 'emailTaken': true });
            }
          },
          error: (error) => {
            console.warn('No se pudo verificar la disponibilidad del email:', error);
          }
        });
      } catch (error) {
        console.warn('Error al verificar email:', error);
      }
    }
  }

  private async showSuccessAlert(title: string, text: string) {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#28a745'
    });
  }

  private showErrorAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonText: 'Intentar de nuevo',
      confirmButtonColor: '#dc3545'
    });
  }

  private showValidationErrors() {
    const errors: string[] = [];
    
    if (this.loginForm.get('username')?.hasError('required')) {
      errors.push('• El nombre de usuario es requerido');
    }
    if (this.loginForm.get('username')?.hasError('minlength')) {
      errors.push('• El nombre debe tener al menos 2 caracteres');
    }
    if (this.loginForm.get('email')?.hasError('required')) {
      errors.push('• El correo electrónico es requerido');
    }
    if (this.loginForm.get('email')?.hasError('email')) {
      errors.push('• El formato del correo no es válido');
    }
    if (this.loginForm.get('email')?.hasError('emailTaken')) {
      errors.push('• Este correo electrónico ya está registrado');
    }
    if (this.loginForm.get('password')?.hasError('required')) {
      errors.push('• La contraseña es requerida');
    }
    if (this.loginForm.get('password')?.hasError('minlength')) {
      errors.push('• La contraseña debe tener al menos 6 caracteres');
    }
    if (this.loginForm.get('numberPhone')?.hasError('required')) {
      errors.push('• El teléfono es requerido');
    }
    if (this.loginForm.get('numberPhone')?.hasError('pattern')) {
      errors.push('• El formato del teléfono no es válido');
    }

    this.showValidationAlert(errors);
  }

  private showValidationErrorsFromService(errors: string[]) {
    const formattedErrors = errors.map(error => `• ${error}`);
    this.showValidationAlert(formattedErrors);
  }

  private showValidationAlert(errors: string[]) {
    Swal.fire({
      icon: 'warning',
      title: 'Formulario incompleto',
      html: `<div style="text-align: left;">${errors.join('<br>')}</div>`,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#ffc107'
    });
  }

  private handleRegistrationError(error: any) {
    let errorMessage = 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.';
    
    // Si el error viene del servicio (RegisterErrorModel)
    if (error.message && error.statusCode) {
      errorMessage = error.message;
    } else {
      // Manejo de errores legacy
      if (error.status === 401 || error.status === 409) {
        errorMessage = 'El correo electrónico ya está registrado.';
      } else if (error.status === 400) {
        errorMessage = 'Los datos proporcionados no son válidos.';
      } else if (error.status === 422) {
        errorMessage = 'Los datos del formulario contienen errores de validación.';
      } else if (error.status === 0) {
        errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
      }
    }

    this.showErrorAlert(errorMessage);
  }

  /**
   * Método para mostrar confirmación antes de limpiar formulario
   */
  async clearForm() {
    const result = await Swal.fire({
      title: '¿Limpiar formulario?',
      text: 'Se perderán todos los datos ingresados',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, limpiar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545'
    });

    if (result.isConfirmed) {
      this.loginForm.reset();
      Swal.fire('¡Listo!', 'El formulario ha sido limpiado', 'success');
    }
  }

  /**
   * Verifica si el servicio está disponible al inicializar el componente
   */
  ngOnInit() {
    this.checkServiceHealth();
  }

  private checkServiceHealth() {
    this.registerService.checkServiceHealth().subscribe({
      next: (isHealthy) => {
        if (!isHealthy) {
          console.warn('El servicio de registro no está disponible');
        }
      },
      error: (error) => {
        console.warn('No se pudo verificar el estado del servicio:', error);
      }
    });
  }

  /**
   * Getter para facilitar el acceso a los controles del formulario en el template
   */
  get formControls() {
    return this.loginForm.controls;
  }

  /**
   * Verifica si un campo específico tiene errores
   * @param fieldName Nombre del campo
   * @returns true si el campo tiene errores y ha sido tocado
   */
  hasFieldError(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Obtiene el mensaje de error para un campo específico
   * @param fieldName Nombre del campo
   * @returns Mensaje de error o cadena vacía
   */
  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} es requerido`;
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldLabel(fieldName)} debe tener al menos ${requiredLength} caracteres`;
      }
      if (field.errors['email']) {
        return 'El formato del correo no es válido';
      }
      if (field.errors['pattern']) {
        return `El formato de ${this.getFieldLabel(fieldName).toLowerCase()} no es válido`;
      }
      if (field.errors['emailTaken']) {
        return 'Este correo electrónico ya está registrado';
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'username': 'El nombre de usuario',
      'email': 'El correo electrónico',
      'password': 'La contraseña',
      'numberPhone': 'El teléfono'
    };
    return labels[fieldName] || fieldName;
  }
}