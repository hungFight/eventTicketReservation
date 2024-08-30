import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateSeatDto {
    @IsNotEmpty({ message: 'ID tầng không được để trống' })
    @IsString()
    floorId: string;

    @IsNotEmpty({ message: 'ID loại ghế không được để trống' })
    @IsString()
    seatTypeId: string;

    @IsNotEmpty({ message: 'Số ghế không được để trống' })
    @IsInt({ message: 'Số ghế phải là một số nguyên' })
    @Min(1, { message: 'Số ghế phải lớn hơn hoặc bằng 1' })
    number: number;
    @IsString()
    description?: string; // optional field
}
