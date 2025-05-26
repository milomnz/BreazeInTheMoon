import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotels.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HotelFull } from '../../models/hotel-full.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.scss']
})
export class HotelesComponent implements OnInit {
  hoteles: HotelFull[] = [];
  hotel: HotelFull | null = null;
  cargando = true;
  error: string | null = null; 

  constructor(private hotelService: HotelService) { }

  ngOnInit() {
    this.hotelService.getHotels().subscribe((data: HotelFull[]) => {
      console.log('Datos recibidos:', data);
      this.hoteles = data;
    });
  }

  /* verHabitaciones(): void {
    this.router.navigate(['/admin/habitaciones', this.hotel.id]);
  }
  
  editarHotel(): void {
    this.router.navigate(['/admin/hotel/editar', this.hotel.id]);
  }
  */ 
}