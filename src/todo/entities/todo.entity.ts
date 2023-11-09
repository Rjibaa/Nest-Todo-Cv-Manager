import { UserEntity } from "../../user/entities/user.entity/user.entity";
import { StatusEnum } from "../../Generics/status.enum";
import { TimestampEntites } from "../../Generics/timestamp.entities";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("todo")
export class TodoEntity extends TimestampEntites  {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    description : string;

    @Column({
        type:"enum",
        enum: StatusEnum,
        default: StatusEnum.TODO
    })
    status : string

    @ManyToOne(
        (type)=>UserEntity,
        (user)=>user.todos,
        {
            nullable:true,
            eager:true
        }
    )
    user:UserEntity

} 