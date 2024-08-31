import { IsEmail, IsNotEmpty, IsString, IsUUID, Max, MaxLength, MinLength } from 'class-validator';

export class CreateSeatTypeDto {
    @IsNotEmpty()
    @IsUUID()
    @MaxLength(50)
    eventId: string;

    @IsNotEmpty({ message: 'Tên loại ghế không được để trống' })
    @IsString()
    @MaxLength(100, { message: 'Tên loại ghế không được quá 100 ký tự' })
    name: string;

    @IsNotEmpty({ message: 'Giá không được để trống' })
    price: number;

    @IsNotEmpty({ message: 'Số lượng không được để trống' })
    quantity: number;
}
