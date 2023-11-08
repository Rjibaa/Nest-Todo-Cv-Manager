import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { AddTodoDto } from './dto/add_todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private TodoRepository : Repository<TodoEntity>
    ){}

    async findbyId(id:number){
        const todo = await this.TodoRepository.findOneBy({"id":id});
        if(! todo){
            throw new NotFoundException(`Le Todo d'id ${id} n'existe pas`);
        }
        return todo
    }

    getall() : Promise<TodoEntity[]> {
        return this.TodoRepository.find();
    }

    addtodo(newtodo : AddTodoDto,user) : Promise<TodoEntity> {
        const addedtodo = {...newtodo,
        "user":user}
        return this.TodoRepository.save(addedtodo);
    }

    updatetodo(criteria,updatedtodo){
        return this.TodoRepository.update(criteria,updatedtodo)
    }

    async updatetodoById(id,updatedtodo:UpdateTodoDto,userId){
        const todo = await this.findbyId(id);
        const todouserId = todo.user.id;
        if(todouserId === userId){
            return this.TodoRepository.update(id, updatedtodo)
        }else{
            throw new UnauthorizedException(`Vous n'avez pas le droit de modifier le todo d'id ${id}`);
        }
    }

    async deletetodo(criteria,userId){
        const todo = await this.findbyId(criteria);
        const todouserId = todo.user.id;
        if(todouserId === userId){
            return this.TodoRepository.delete(criteria)
        }else{
            throw new UnauthorizedException(`Vous n'avez pas le droit de supprimer le todo d'id ${criteria}`);
        }
 
    }

    softdeletetodo(criteria){
        return this.TodoRepository.softDelete(criteria)
    }

    async restoretodo(id:number){
        return this.TodoRepository.restore(id);
    }

    async NbTodoByStatus(){
        const query = this.TodoRepository.createQueryBuilder("todo");
        query.select("todo.status,count(todo.id)  as NombreStatus").groupBy("todo.status")
        return await query.getRawMany();
    }

    pagetodo(page:number,pageSize:number){
        const offset = (page-1)*pageSize;
        const query = this.TodoRepository.createQueryBuilder("todo");
        const todos = query.select().skip(offset).take(pageSize).getMany();
        return todos
    }
}
