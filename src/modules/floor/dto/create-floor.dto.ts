import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateFloorDto {
    @IsNotEmpty({ message: 'Số tầng không được để trống' })
    @IsInt({ message: 'Số tầng phải là một số nguyên' })
    @Min(1, { message: 'Số tầng phải lớn hơn hoặc bằng 1' })
    number: number;

    @IsNotEmpty({ message: 'ID sự kiện không được để trống' })
    @IsString()
    eventId: string;
}
