//import { jwtDecode } from 'jwt-decode';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const credentials = {
      correo: this.loginForm.value.correo,
      password: this.loginForm.value.password,
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        const token = response.access_token;
        this.authService.guardarToken(token);
        const rol = response.rol;  // Se toma el rol directamente del backend

        if (rol === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (rol === 'CLIENTE') {
          this.router.navigate(['/StartPage']);
        } else {
          console.warn('Rol desconocido:', rol);
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesión', err);
      }
    });
  }
}