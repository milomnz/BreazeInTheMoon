import { Component, OnInit } from '@angular/core';
import { Router , RouterModule} from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [],
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Puedes agregar lógica de inicialización aquí si es necesario,
    // como cargar datos desde un servicio o realizar alguna operación.
  }

}