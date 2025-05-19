// app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, BusquedaComponent],  // Importa NavbarComponent aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent { }