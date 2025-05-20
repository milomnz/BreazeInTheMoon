/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { TipoInforme } from 'src/constants/tipo-informe.enum';

export class CreateInformeDto {
  @ApiProperty({
    description: 'Fecha de inicio del período que cubre el informe',
    example: '2025-05-01T00:00:00Z',
  })
  fechaInicio: Date;

  @ApiProperty({
    description: 'Fecha de fin del período que cubre el informe',
    example: '2025-05-15T23:59:59Z',
  })
  fechaFin: Date;

  @ApiProperty({
    description: 'Contenido detallado del informe',
    example: 'Durante tal período, el hotel alcanzó un 90% de ocupación o de capacidad máxima...',
  })
  contenido: string;

  @ApiProperty({
    description: 'Tipo de informe generado',
    enum: TipoInforme,
    example: TipoInforme.OCUPACION,
  })
  tipo: TipoInforme;

  @ApiProperty({
    description: 'ID del hotel al que pertenece el informe',
    example: 1,
  })
  hotelId: number;

  @ApiProperty({
    description: 'ID del administrador que genera el informe',
    example: 2,
  })
  administradorId: number;
}