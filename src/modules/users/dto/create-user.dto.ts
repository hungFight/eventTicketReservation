import { IsEmail, IsNotEmpty, IsString, Max, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
   
    @IsNotEmpty({ message: 'Tên người dùng không được để trống' })
    @IsString()
    @MaxLength(100, { message: 'Tên người dùng không được quá 100 ký tự' })
    @MinLength(6, { message: 'Tên người dùng không được bé hơn 6 ký tự' })
    userName: string;

    @IsNotEmpty({ message: 'Avatar không được để trống' })
    @IsString()
    @MaxLength(250, { message: 'Avatar không đƯợc quá 250 ký tự' })
    avatar: string;

    @IsNotEmpty({ message: 'Email không được để trống' })
    @IsString()
    @IsEmail()
    @MaxLength(255, { message: 'Email không được quá 255 ký tự' })
    email: string;

    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @IsString()
    @MaxLength(50, { message: 'Mật khẩu không được quá 50 ký tự' })
    @MinLength(6, { message: 'Mật khẩu không được bé hơn 6 ký tự' })
    password: string;

    @IsNotEmpty({ message: 'AccountType không được để trống' })
    @IsString()
    @MaxLength(10, { message: 'AccountType không được quá 10 ký tự' })
    accountType: string;
}
