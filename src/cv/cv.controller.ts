import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CvService } from './cv.service';
import { AddCvDto } from './dto/add-cv.dto';
import { AuthGuard } from 'src/user/Guard/user.gard';

@Controller('cv')
export class CvController {
    constructor(
        private cvservice : CvService
        ){}
    

    @Get()
    getcvs(){
        return this.cvservice.getall();
    }

    @Post()
    Addcv(
        @Body() newCv : AddCvDto
    ){
        return this.cvservice.addcv(newCv)
    }

    @Patch()
    Updatecv(
        @Body() updateObject
    ){
        const {updateCriteria, updateCvDto} = updateObject
        return this.cvservice.updatecv(updateCriteria, updateCvDto);
    }

    @Delete()
    deletecv(
        @Body() deleteobject
    ){  
        const {criteria} = deleteobject
        return this.cvservice.deletecv(criteria);
    }

    @Get(':id')
    getcvbyid(
        @Param('id',ParseIntPipe) id
    ){
        return this.cvservice.findbyId(id);
    }

    @Delete('soft')
    softdeletecv(
        @Body() deleteobject
    ){  
        const {criteria} = deleteobject
        return this.cvservice.softdeletecv(criteria);
    }

    @Post('restore/:id')
    recovercv(
        @Param('id',ParseIntPipe) id
    ){  
        return this.cvservice.restorecv(id);
    }

}
