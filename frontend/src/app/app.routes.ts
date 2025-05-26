import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component'
import { StartPageComponent } from './start-page/start-page.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { HotelesComponent } from './admin/hoteles/hoteles.component';
import { ReservasComponent } from './admin/reservas/reservas.component';
import { ReseniasComponent } from './admin/resenias/resenias.component';

export const routes: Routes = [
  { path: '', redirectTo: 'StartPage', pathMatch: 'full' },
  { path: 'StartPage', component: StartPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'date-picker', component: DateRangePickerComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent, // El layout contenedor
    children: [
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
      { path: 'resenias', component: ReseniasComponent },
      { path: 'hoteles', component: HotelesComponent },
      { path: 'reservas', component: ReservasComponent },
      //{ path: 'habitaciones/:id', loadComponent: () => import('./admin/habitaciones/habitaciones.component').then(m => m.HabitacionesComponent) },
      //{ path: 'hotel/editar/:id', loadComponent: () => import('./admin/hotel-editar/hotel-editar.component').then(m => m.HotelEditarComponent) },
    ]
  }];