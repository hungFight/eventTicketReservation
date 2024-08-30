import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateSeatDto } from './create-seat.dto';

export class UpdateSeatDto extends PickType(CreateSeatDto, ['number'] as const) {}
