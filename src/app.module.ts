import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './middleware/first/first.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import * as dotenv from 'dotenv';
import { CvEntity } from './cv/entities/cv.entity/cv.entity';


dotenv.config();
console.log(process.env.DB_USERNAME);
@Module({
  imports: [TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql' ,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities:true,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    CvModule,
    UserModule,
    SkillModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware).forRoutes(
      {path: 'todo', method: RequestMethod.GET},
      {path: 'todo*', method: RequestMethod.DELETE},)
      //.apply(logger).forRoutes('')
  }
    
}
