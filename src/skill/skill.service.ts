import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from './entites/skill.entity/skill.entity';
import { Repository } from 'typeorm';
import { AddSkillDto } from './dto/add-skill.dto';

@Injectable()
export class SkillService {
    constructor(
        @InjectRepository(SkillEntity)
        private SkillRepository : Repository<SkillEntity>
    ){}

    async findbyId(id:number){
        const cv = await this.SkillRepository.findOneBy({"id":id});
        if(! cv){
            throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
        }
        return cv
    }

    getall() : Promise<SkillEntity[]> {
        return this.SkillRepository.find();
    }

    addskill(newcv : AddSkillDto) : Promise<SkillEntity> {
        return this.SkillRepository.save(newcv);
    }

    updateskill(criteria,updatedcv){
        return this.SkillRepository.update(criteria,updatedcv)
    }

    deleteskill(criteria){
        return this.SkillRepository.delete(criteria)
    }

    softdeleteskill(criteria){
        return this.SkillRepository.softDelete(criteria)
    }

    async restoreskill(id:number){
        return this.SkillRepository.restore(id);
    }
}
