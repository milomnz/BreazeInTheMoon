import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DateRangePickerComponent} from './date-range-picker/date-range-picker.component'
import { StartPageComponent } from './start-page/start-page.component';
import { ProfileComponent } from './profile/profile.component';
import { CardsComponent } from './cards/cards.component';
import { ReviewStartComponent } from './review-start/review-start.component';
export const routes: Routes = [
     { path: '', redirectTo: 'StartPage', pathMatch: 'full' },
     { path : 'StartPage', component: StartPageComponent },
     { path: 'login', component: LoginComponent },
     { path: 'register', component: RegisterComponent },
     { path: 'navbar', component: NavbarComponent },
     { path: 'busqueda', component: BusquedaComponent},
     {path: 'date-picker', component: DateRangePickerComponent },
     {path: 'profile', component: ProfileComponent },
     {path : 'cards', component: CardsComponent },
     {path: 'review-start', component: ReviewStartComponent}
];
