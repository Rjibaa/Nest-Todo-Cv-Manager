import { CvEntity } from "src/cv/entities/cv.entity/cv.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SkillEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    designation:string

}
