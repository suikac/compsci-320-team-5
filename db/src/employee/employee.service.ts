import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/Employee';
import { EmployeeRepository } from './employee.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private employeeRepository: EmployeeRepository
  ) {}

  public async getEmployee(id: number): Promise<Employee> {
    return this.employeeRepository
      .createQueryBuilder()
      .where('id = :id', { id: id })
      .getOneOrFail();
  }

  public async getEmployeeByEmail(email: string): Promise<Employee> {
    return this.employeeRepository
      .createQueryBuilder('Employee')
      .where('email = :email', { email: email })
      .getOne();
  }

  public async signUpEmployee(email: string, password: string) {
    await this.employeeRepository
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
