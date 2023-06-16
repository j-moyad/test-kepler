import {IsEmail, IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(15)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}