import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { randDirectoryPath, randFirstName, randJobTitle, randLastName, randNumber } from '@ngneat/falso';
import { CvService } from '../cv/cv.service';


async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    for(let i=0;i<20;i++){
        const cv = {
        lastname: randLastName(),
        firstname: randFirstName(),
        age: randNumber({ min: 18, max: 100 }),
        cin: randNumber({ min: 0, max: 9999999 })+10000000,
        job: randJobTitle(),
        path: randDirectoryPath()
    };
    
    const cvservice = app.get(CvService);
    await cvservice.addcv(cv);}
    
    
    // Wait for the create operation to complete before closing the app context.
    await app.close();
  }
  bootstrap();