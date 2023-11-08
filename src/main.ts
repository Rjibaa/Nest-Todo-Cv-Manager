import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DurationInterceptor } from './interceptor/duration-interceptor/duration-interceptor';
import * as dotenv from 'dotenv';


dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*app.use((req: Request, res: Response, next: () => void)=>{
    console.log("First");
    next();
  })*/
  app.useGlobalPipes(new ValidationPipe({
    transform : true,
    whitelist : true
  }));
  //app.useGlobalInterceptors(new DurationInterceptor());
  await app.listen(process.env.APP_PORT);
}
bootstrap();
