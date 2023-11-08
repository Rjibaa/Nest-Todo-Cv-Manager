import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { SkillService } from './skill.service';
import { AddSkillDto } from './dto/add-skill.dto';

@Controller('skill')
export class SkillController {
    constructor(
        private skillservice : SkillService
        ){}
    

    @Get()
    getcvs(){
        return this.skillservice.getall();
    }

    @Post()
    Addcv(
        @Body() newskill : AddSkillDto
    ){
        return this.skillservice.addskill(newskill)
    }

    @Patch()
    Updatecv(
        @Body() updateObject
    ){
        const {updateCriteria, updateCvDto} = updateObject
        return this.skillservice.updateskill(updateCriteria, updateCvDto);
    }

    @Delete()
    deletecv(
        @Body() deleteobject
    ){  
        const {criteria} = deleteobject
        return this.skillservice.deleteskill(criteria);
    }

    @Get(':id')
    getcvbyid(
        @Param('id',ParseIntPipe) id
    ){
        return this.skillservice.findbyId(id);
    }

    @Delete('soft')
    softdeletecv(
        @Body() deleteobject
    ){  
        const {criteria} = deleteobject
        return this.skillservice.softdeleteskill(criteria);
    }

    @Post('restore/:id')
    recovercv(
        @Param('id',ParseIntPipe) id
    ){  
        return this.skillservice.restoreskill(id);
    }
}
