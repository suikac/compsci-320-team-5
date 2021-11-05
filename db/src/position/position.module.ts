import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from 'src/entities/Position';
import { PositionController } from './position.controller';
import { PositionRepository } from './position.repository';
import { PositionService } from './position.service';
import { PositionTagRepository } from './positionTag.repository';
import { TagRepository } from './tag.repository';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Position,
      PositionRepository,
      TagRepository,
      PositionTagRepository,
    ]),
    EmployeeModule
  ],
  controllers: [PositionController],
  providers: [PositionService],
  exports: [PositionService],
})
export class PositionModule {}
