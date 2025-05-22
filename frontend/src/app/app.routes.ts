import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DateRangePickerComponent} from './date-range-picker/date-range-picker.component'
import { StartPageComponent } from './start-page/start-page.component';


export const routes: Routes = [
     { path: '', redirectTo: 'StartPage', pathMatch: 'full' },
     { path : 'StartPage', component: StartPageComponent },
     { path: 'login', component: LoginComponent },
     { path: 'navbar', component: NavbarComponent },
     { path: 'busqueda', component: BusquedaComponent},
     {path: 'date-picker', component: DateRangePickerComponent }
];
