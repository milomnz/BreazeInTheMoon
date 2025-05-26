import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [
    RouterModule,
    NavbarComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.profileForm = this.fb.group({
      correo: [''],
      telefono: [''],
      password: ['']
    });
  }


  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Formulario enviado:', this.profileForm.value);
      // Aquí puedes agregar la lógica para actualizar el perfil del usuario
      // Por ejemplo, llamar a un servicio de perfil
      this.router.navigate(['StartPage']);
    } else {
      console.log('Formulario no válido');
    }
  }
}