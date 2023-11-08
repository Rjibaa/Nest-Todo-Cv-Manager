import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GenericsService<T> {
    constructor(
    /*@InjectRepository()
    private GenericRepository : Repository<T>*/){}



}
