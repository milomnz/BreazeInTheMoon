/* eslint-disable prettier/prettier */
export interface JwtPayload {
  userId: number;
  correo: string;
  rol: string;
  nombre?: string;
}