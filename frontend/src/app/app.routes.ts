import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

export const routes: Routes = [
     { path: 'login', component: LoginComponent },
     { path: 'navbar', component: NavbarComponent },
     { path: 'busqueda', component: BusquedaComponent} 
];
