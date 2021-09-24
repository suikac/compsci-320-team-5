import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository } from '../../../db/repository/employee.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeRepository])],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
