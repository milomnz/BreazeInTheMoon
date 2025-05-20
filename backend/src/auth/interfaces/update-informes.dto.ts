/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateInformeDto } from './create-informes.dto';

export class UpdateInformeDto extends PartialType(CreateInformeDto) {}