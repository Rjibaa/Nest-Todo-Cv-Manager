import {Injectable} from '@nestjs/common';
import { IBaseService } from './IBase.service';
import { Repository } from 'typeorm';


@Injectable()
export class BaseService<T> implements IBaseService<T>{
	constructor(
    private readonly genericRepository: Repository<T>) {}
    getAll(): Promise<T[]> {
        return this.genericRepository.find();
    }
    
}