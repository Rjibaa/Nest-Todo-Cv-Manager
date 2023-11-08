import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AdduserDto {

    @IsNotEmpty()
    @IsString()
    username:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    password:string
}