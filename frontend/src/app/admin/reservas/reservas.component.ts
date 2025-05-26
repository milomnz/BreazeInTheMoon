import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservas',
  imports: [CommonModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})
export class ReservasComponent implements OnInit {
  reservas = [
    { id: 1, fecha: '2025-05-01', estado: 'Confirmada' },
    { id: 2, fecha: '2025-05-02', estado: 'Pendiente' },
  ];
  ngOnInit(): void {}
}