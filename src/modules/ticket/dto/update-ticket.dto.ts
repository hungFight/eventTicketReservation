import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsUUID, ValidateNested } from 'class-validator';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateTicketDto {
    @IsNotEmpty()
    @IsUUID()
    ticketId: string;

    @IsNotEmpty()
    @IsUUID()
    seatId: string;
}
