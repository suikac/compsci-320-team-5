import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/Employee';
import { EmployeeRepository } from './employee.repository';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(EmployeeRepository)
        private employeeRepository: EmployeeRepository
    ){}

    public async getEmployee() : Promise<Employee[]> {
        const employee = await this.employeeRepository.findByIds([1, 2]);
        return employee
    }

    public async getPasswordByEmail(email: String) : Promise<String> {
        const employee = this.employeeRepository
        .createQueryBuilder('Employee')
        .where('email = :email', {email: email})
        .getOne()
        
        return (await employee).password
    }
}
