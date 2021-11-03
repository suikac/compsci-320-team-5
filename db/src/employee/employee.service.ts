import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/Employee';
import { EmployeeRepository } from './employee.repository';
import * as bcrypt from 'bcrypt';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private employeeRepository: EmployeeRepository
  ) {}

  public async getEmployee(): Promise<Employee[]> {
    const employee = await this.employeeRepository.findByIds([1, 2]);
    return employee;
  }

  public async getEmployeeById(id: number): Promise<Employee> {
    const employees = await this.employeeRepository.findByIds([1]);
    if (employees.length == 0) {
      throw EntityNotFoundError;
    }
    return employees[0];
  }

  public async getEmployeeByEmail(email: string): Promise<Employee> {
    return this.employeeRepository
      .createQueryBuilder('Employee')
      .where('email = :email', { email: email })
      .getOne();
  }

  public async signUpEmployee(email: string, password: string) {
    this.employeeRepository
      .createQueryBuilder()
      .insert()
      .into('employee')
      .values({
        email: email,
        password: await bcrypt.hash(password, await bcrypt.genSalt()),
      })
      .execute();
  }
}
