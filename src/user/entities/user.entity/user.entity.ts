import { type } from "os";
import { CvEntity } from "../../../cv/entities/cv.entity/cv.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TodoEntity } from "../../../todo/entities/todo.entity";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        length:50,
        unique:true,
        nullable:false
    })
    username:string

    @Column({
        length:50,
        unique:true,
        nullable:false
    })
    email:string

    @Column()
    salt:string

    @Column()
    password:String

    @OneToMany(
        type=>CvEntity,
        (cv)=>cv.user,
        {
            nullable:true,
            cascade:true
        }
    )
    cvs:CvEntity[]

    @OneToMany(
        type=> TodoEntity,
        (todo)=>todo.user,
        {
            nullable:true,
            cascade:true
        }
    )
    todos:TodoEntity[]
    
}
