import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { StatusEnum } from "../../Generics/status.enum";

export class AddTodoDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(3, {
        message: 'La taille minimale du champ name est de 6 caractère'
    })
    @MaxLength(25)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    description: string;

    @IsNotEmpty()
    status : StatusEnum;
}