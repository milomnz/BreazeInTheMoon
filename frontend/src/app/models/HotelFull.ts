export interface HotelFull {
  id: number;
  nombre: string;
  descripcion: string;
  telefono: string;
  localizacion: string;
  calificacionPromedio: number;
  fechaCreacion: Date; // O Date, dependiendo de cómo lo estés tratando
}