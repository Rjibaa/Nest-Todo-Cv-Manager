import { TimestampEntites } from "../../../Generics/timestamp.entities";
import { SkillEntity } from "../../../skill/entites/skill.entity/skill.entity";
import { UserEntity } from "../../../user/entities/user.entity/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cv')
export class CvEntity extends TimestampEntites {
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      name: 'lastname',
      length: 50
    })
    lastname: string;
  
    @Column({
      length: 50
    })
    firstname: string;
  
    @Column()
    age: number;
  
    @Column()
    cin: number;
  
    @Column()
    job: string;
  
    @Column()
    path: string;

    @ManyToOne(
      type=>UserEntity,
      (user)=>user.cvs,
      {
        eager:true,
        nullable:true
      }
    )
    user:UserEntity

    @ManyToMany(
      type=>SkillEntity,
      {
        eager:true,
        nullable:true,
        cascade:true
      }
    )
    @JoinTable()    
    skills: SkillEntity[]
}
