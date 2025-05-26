import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';  // Este es el componente raíz (crearemos uno simple si no existe)
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { StartPageComponent } from './start-page/start-page.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { HotelesComponent } from './admin/hoteles/hoteles.component';
import { ReservasComponent } from './admin/reservas/reservas.component';

// Importa las rutas que ya tienes definidas
import { routes } from './app.routes';
import { ReseniasComponent } from './admin/resenias/resenias.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    BusquedaComponent,
    DateRangePickerComponent,
    StartPageComponent,
    AdminLayoutComponent,
    HotelesComponent,
    ReservasComponent,
    ReseniasComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),  // Aquí cargas tus rutas
  ],
  providers: [],
  exports: [HotelesComponent],
  bootstrap: [AppComponent]  // El componente raíz que Angular carga primero
})
export class AppModule { }