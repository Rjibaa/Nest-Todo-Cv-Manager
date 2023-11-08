import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdduserDto } from './dto/add-user.dto';
import * as bcrypt from 'bcrypt' 
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository : Repository<UserEntity> ,  
        private jwtService: JwtService ){}

    async Register(newuser:AdduserDto){
        const {password} = newuser;
        const user = this.userRepository.create({
            ...newuser
        });
        user.salt=await bcrypt.genSalt();
        user.password= await bcrypt.hash(password,user.salt);
        try{
            return this.userRepository.save(user);
        }catch(e){
            throw new ConflictException("Password ou username invalide");
        }
    }

    async login(loggeruser:LoginUserDto ){
        const currentpassworrd= loggeruser.password;
        const user = await this.userRepository.findOneBy({"username":loggeruser.username});
        if(! user){
            throw new NotFoundException("User not found")
        }else{
            const userpassword = user.password;
            const logger = await bcrypt.compare(currentpassworrd,userpassword);
            if(!logger){
                throw new UnauthorizedException();
            }else{
            const payload = { email: user.email, username: user.username,id: user.id };
            return {
            access_token: await this.jwtService.signAsync(payload),
            };
            }
        }
        
    }


    }
