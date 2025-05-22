import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BusquedaComponent } from '../busqueda/busqueda.component';
import { DateRangePickerComponent } from '../date-range-picker/date-range-picker.component';
import { LoginComponent } from '../login/login.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-start-page',
  imports: [RouterModule, NavbarComponent, BusquedaComponent, DateRangePickerComponent, LoginComponent],
  standalone: true,
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {

}
