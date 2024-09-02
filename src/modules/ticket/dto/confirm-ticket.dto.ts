import { IsNotEmpty, IsUUID } from 'class-validator';

export class ConfirmTicketDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;
    @IsUUID()
    @IsNotEmpty()
    ticketCodeId: string;
    @IsUUID()
    @IsNotEmpty()
    eventId: string;
}
