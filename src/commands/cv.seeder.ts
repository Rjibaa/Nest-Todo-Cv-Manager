import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { randDirectoryPath, randEmail, randFirstName, randJobTitle, randLastName, randNumber, randPassword, randSkill, randUserName } from '@ngneat/falso';
import { CvService } from '../cv/cv.service';
import { UserService } from '../user/user.service';
import { SkillService } from '../skill/skill.service';


async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const userService = app.get(UserService);
    const skillService=app.get(SkillService);

    const user={
        username: randUserName(),
        email: randEmail(),
        password:randPassword(),
    }

    const skill={
        designation: randSkill(),
    }

    const userResult= await userService.Register(user);
    const skillResult = await skillService.addskill(skill)
    console.log(userResult);
    
    
    for(let i=0;i<2;i++){
        const cv = {
        lastname: randLastName(),
        firstname: randFirstName(),
        age: randNumber({ min: 18, max: 100 }),
        cin: randNumber({ min: 0, max: 9999999 })+10000000,
        job: randJobTitle(),
        path: randDirectoryPath(),
        user: userResult,
        skills: [skillResult],
    };
    
    const cvservice = app.get(CvService);
    await cvservice.addcv(cv);
    console.log("cv added successfully");    
}
    
    
    // Wait for the create operation to complete before closing the app context.
    await app.close();
  }
  bootstrap();