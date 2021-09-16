import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';
import { EmployeeRepository } from './employee.repository';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(EmployeeRepository)
        private employeeRepository: EmployeeRepository,
    ){}

    public async createEmployee(
        createEmployeeDto: CreateEmployeeDto
    ): Promise<Employee> {
        return await this.employeeRepository.createEmployee(createEmployeeDto)
    }
}
