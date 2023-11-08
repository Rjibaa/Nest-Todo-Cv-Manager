import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { SkillEntity } from './entites/skill.entity/skill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([SkillEntity])],
  providers: [SkillService],
  controllers: [SkillController]
})
export class SkillModule {}
