import { Injectable, NotFoundException } from '@nestjs/common';
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

    /**
     * name
     */
    public getEmployee(employeeId: number): Promise<Employee> {
        const foundEmployee = this.employeeRepository.findOne(employeeId)
        if (!foundEmployee) {
            throw new NotFoundException("Employee Not Found")
        }
        return foundEmployee
    }

    /**
     * editEmployee
     */
    public async editEmployee(createEmployeeDto: CreateEmployeeDto, employeeId: number) : Promise<Employee>{
        const foundEmployee = await this.employeeRepository.findOne(employeeId)
        if (!foundEmployee) {
            throw new NotFoundException("Employee Not Found")
        }
        const {name, email, role} = createEmployeeDto

        return this.employeeRepository.updateEmployee(createEmployeeDto, foundEmployee);
    }
}
