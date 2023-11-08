import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity/cv.entity';
import { Repository } from 'typeorm';
import { AddCvDto } from './dto/add-cv.dto';

@Injectable()
export class CvService {
    constructor(
        @InjectRepository(CvEntity)
        private CvRepository : Repository<CvEntity>
    ){}

    async findbyId(id:number){
        const cv = await this.CvRepository.findOneBy({"id":id});
        if(! cv){
            throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
        }
        return cv
    }

    getall() : Promise<CvEntity[]> {
        return this.CvRepository.find();
    }

    addcv(newcv : AddCvDto) : Promise<CvEntity> {
        return this.CvRepository.save(newcv);
    }

    updatecv(criteria,updatedcv){
        return this.CvRepository.update(criteria,updatedcv)
    }

    deletecv(criteria){
        return this.CvRepository.delete(criteria)
    }

    softdeletecv(criteria){
        return this.CvRepository.softDelete(criteria)
    }

    async restorecv(id:number){
        return this.CvRepository.restore(id);
    }

}
