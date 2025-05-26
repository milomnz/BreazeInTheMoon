// app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DateRangePickerComponent} from './date-range-picker/date-range-picker.component'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, BusquedaComponent, DateRangePickerComponent],  // Importa NavbarComponent aquí
  template: `<router-outlet></router-outlet>`,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }