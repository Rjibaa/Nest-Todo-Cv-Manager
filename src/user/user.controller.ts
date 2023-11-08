import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AdduserDto } from './dto/add-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userservice : UserService
    ){}

    @Post()
    registeruser(
        @Body() newuser : AdduserDto 
    ){
        return this.userservice.Register(newuser);
    }

    @Get("/login")
    loginuser(
        @Body() loginuser : LoginUserDto
    ){
        return this.userservice.login(loginuser);
    }

}
