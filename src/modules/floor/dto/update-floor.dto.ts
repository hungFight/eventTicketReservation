import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateFloorDto } from './create-floor.dto';

export class UpdateFloorDto extends PickType(CreateFloorDto, ['number'] as const) {}
