import { Type } from 'class-transformer';
import { IsUUID, ValidateNested } from 'class-validator';
class TicketData {
    @IsUUID()
    seatId: string;
}
export class CreateTicketDto {
    @IsUUID()
    userId: string;
    @ValidateNested({ each: true })
    @Type(() => TicketData)
    data: TicketData[];
}
