// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Importa FormGroup
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // 1. Declara una propiedad para tu formulario reactivo
  loginForm: FormGroup;
  

  constructor(private fb: FormBuilder) {
    // 2. Inicializa tu formulario en el constructor
    this.loginForm = this.fb.group({
      username: [''], // Campo para el nombre de usuario
      password: ['']  // Campo para la contraseña
      // Puedes añadir validaciones aquí si las necesitas, por ejemplo:
      // username: ['', Validators.required],
      // password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // 3. Define el método onSubmit() que se llama desde la plantilla HTML
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario enviado:', this.loginForm.value);
      // Aquí es donde normalmente enviarías los datos del formulario
      // a un servicio de autenticación o a tu backend.
    } else {
      console.log('Formulario no válido. Por favor, revisa los campos.');
      // Puedes añadir lógica para mostrar mensajes de error al usuario
    }
  }
}