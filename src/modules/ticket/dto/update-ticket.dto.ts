import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateTicketDto {
    @IsNotEmpty()
    @IsUUID()
    ticketId: string;

    @IsNotEmpty()
    @IsUUID()
    seatId: string;
}
