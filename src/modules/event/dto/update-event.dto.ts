import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { IsOptional } from 'class-validator';

export class UpdateEventDto extends PickType(CreateEventDto, ['name', 'address'] as const) {}
