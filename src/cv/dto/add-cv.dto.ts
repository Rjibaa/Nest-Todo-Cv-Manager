import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";
import { type } from "os";

export class AddCvDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(15)
    lastname: string;
    
    @IsNotEmpty()
    @IsString()
    firstname: string;
    
    @IsNotEmpty()
    @Type(() => Number )
    @IsNumber()
    @Min(15)
    age: number;
    
    @IsNotEmpty()
    @Type(() => Number )
    @IsNumber()
    cin: number;

    @IsNotEmpty()
    @IsString()
    job: string;
    
    @IsNotEmpty()
    @IsString()
    path: string;
}