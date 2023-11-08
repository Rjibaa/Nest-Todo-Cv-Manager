import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { TodoEntity } from './entities/todo.entity';
import { AddTodoDto } from './dto/add_todo.dto';
import { TodoService } from './todo.service';
import { GetPaginatedTodoDto } from './dto/get-paginated-todo.dto';
import { UpperAndFusionPipe } from '../pipes/upper-and-fusion-pipe/upper-and-fusion-pipe.pipe';
//import { DurationInterceptor } from 'src/interceptor/duration-interceptor/duration-interceptor';
import { AuthGuard } from '../user/Guard/user.gard';
import { Request } from 'express';
 


//@UseInterceptors(DurationInterceptor)
@Controller('todo')
export class TodoController {
    constructor(private todoService : TodoService){}

    @Get()
    @UseGuards(AuthGuard)
    getTodos(
      @Req() request : Request
    ) {
    console.log(request['user']);
    return this.todoService.getall();
  }

    @Get("status")
    nbrstatus(){
      return this.todoService.NbTodoByStatus();
    }

    @Get("pagination")
    pagination(
      @Query('page',ParseIntPipe) page: number = 1,
      @Query('pageSize',ParseIntPipe) pageSize: number = 3, 
    ){
      return this.todoService.pagetodo(page,pageSize);
    }

  
    @Get('/:id')
    getTodoById(
      @Param('id',ParseIntPipe) id
    ) {
      return this.todoService.findbyId(id);
    }
  

    @Post()
    @UseGuards(AuthGuard)
    addTodo(
      @Body() newTodo : AddTodoDto,  
      @Req() request : Request
    ){ 
      const user = request["user"];
      return this.todoService.addtodo(newTodo,user);
    }

    @Post('restore/:id')
    recovercv(
        @Param('id',ParseIntPipe) id
    ){  
        return this.todoService.restoretodo(id);
    }
  
    @Patch()
    UpdateTodo(
      @Body() updateobject,
    ) {
        const {criteria,updatedtodo} = updateobject;
        return this.todoService.updatetodo(criteria,updatedtodo)
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    UpdateTodoByid(
      @Param('id',ParseIntPipe) id,
      @Body() udpatedtodo,
      @Req() request : Request 
    ) { 
        const userId = request["user"].id;
        console.log(userId)
        return this.todoService.updatetodoById(id,udpatedtodo,userId)
    }


    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteTodo(
      @Req() request : Request,
      @Param('id',ParseIntPipe) id
    ) {
      const userId = request["user"].id; 
      return this.todoService.deletetodo(id,userId);
    }

    @Delete('soft')
    softdeletecv(
        @Body() deleteobject
    ){  
        const {criteria} = deleteobject
        return this.todoService.softdeletetodo(criteria);
    }

    /*@Post('pipe')
    usepipe(
      @Body(UpperAndFusionPipe) data
    ){
       return data ;
    }*/


  
  }