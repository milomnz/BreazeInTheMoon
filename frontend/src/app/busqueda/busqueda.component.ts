import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../services/hotels.service';
import { Hotel } from '../models/hotel.model';
import { CommonModule } from '@angular/common';
import { DateRangePickerComponent} from '../date-range-picker/date-range-picker.component';

@Component({


  selector: 'app-busqueda',
  imports: [CommonModule, DateRangePickerComponent],
  providers: [], // Usar provideHttpClient en providers
  standalone: true,
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.scss'
})
export class BusquedaComponent implements OnInit {
  hoteles: Hotel[] = [];
  hotelSeleccionadoNombre: string | null = null;

  constructor(private hotelsService: HotelsService) {}

  ngOnInit() {
    this.hotelsService.getHotels().subscribe({
      next: (data) => (this.hoteles = data),
      error: (err) => console.error('Error al cargar hoteles:', err)
    });
  }

  onHotelChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const hotelId = Number(select.value);
    const hotelSeleccionado = this.hoteles.find(hotel => hotel.id === hotelId);
    this.hotelSeleccionadoNombre = hotelSeleccionado ? hotelSeleccionado.nombre : null;
    console.log('Hotel seleccionado:', this.hotelSeleccionadoNombre);
  }
}