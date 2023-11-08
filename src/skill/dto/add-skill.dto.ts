import { IsNotEmpty, IsString } from "class-validator";

export class AddSkillDto {
    @IsNotEmpty()
    @IsString()
    designation:string
}