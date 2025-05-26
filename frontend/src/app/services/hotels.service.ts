import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Hotel } from '../models/hotel.model';
import { HotelFull } from '../models/hotel-full.model';


@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private apiUrl = 'http://localhost:3000/hoteles'; // URL de la API
  constructor(private http: HttpClient) { }
  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener los hoteles:', error);
          return throwError(() => error);
        })
      );
  }

  getMiHotel(): Observable<HotelFull> {
    const token = localStorage.getItem('token');
    console.log('Token en getMiHotel:', token);
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<HotelFull>(`${this.apiUrl}/me`, { headers });
  }
}
