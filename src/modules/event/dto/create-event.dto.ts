import { IsDate, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateEventDto {
    @IsNotEmpty({ message: 'Tên sự kiện không được để trống' })
    @IsString()
    @MaxLength(250, { message: 'Tên sự kiện không được quá 250 ký tự' })
    name: string;

    @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
    @IsString()
    @MaxLength(250, { message: 'Địa chỉ không được quá 250 ký tự' })
    address: string;

    @IsNotEmpty()
    @IsString()
    startTime: string;

    @IsNumber()
    @IsNotEmpty()
    budget: number;
}
