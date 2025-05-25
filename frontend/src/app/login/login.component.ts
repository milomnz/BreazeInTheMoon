// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Importa FormGroup
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { LoginService } from '../services/auth/login.service';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    RegisterComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private LoginService: LoginService,
    private Router : Router, // Asegúrate de importar Router
  ) {

    // Inicializar campos del formulario
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],  
    });
  }

  // 3. Define el método onSubmit() que se llama desde la plantilla HTML
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario enviado:', this.loginForm.value);
      try {
        Swal.fire({
          title: 'Iniciando sesión...',
          text: 'Por favor espera',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        this.LoginService.login(this.loginForm.value).subscribe({
          next: async (response) => {

            Swal.close();
      
            this.loginForm.reset(); // Reinicia el formulario después de un inicio de sesión exitoso
            console.log('Usuario logueado exitosamente');
            this.Router.navigate(['StartPage']);
            // Redirige al usuario a la página de inicio o dashboard
          
        },
        error: (error) => {
          Swal.close();
          console.error('Error al iniciar sesión:', error);
          // Muestra un mensaje de error al usuario
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.',
            confirmButtonText: 'Aceptar'
          });

        }
      });

      } catch (error) {
        Swal.close();
        console.error('Error inesperado:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error inesperado. Por favor, intenta de nuevo.',
          confirmButtonText: 'Aceptar'
        });
      }

    } else {
      console.log('Formulario no válido. Por favor, revisa los campos.');
      // Puedes añadir lógica para mostrar mensajes de error al usuario
    }
  }
}