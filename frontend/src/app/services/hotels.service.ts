import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelFull } from '../models/hotel-full.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private baseUrl = 'http://localhost:3000/hoteles';
  private apiUrl = 'http://localhost:3000/hoteles';

  constructor(private http: HttpClient) { }

  getHotels(): Observable<HotelFull[]> {
    return this.http.get<HotelFull[]>(this.apiUrl);
  }

  getMiHotel(): Observable<HotelFull> {
    const token = localStorage.getItem('token');
    console.log('Token en getMiHotel:', token);
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<HotelFull>(`${this.baseUrl}/me`, { headers });
  }
}