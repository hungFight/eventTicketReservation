import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    fullName: string;
}
