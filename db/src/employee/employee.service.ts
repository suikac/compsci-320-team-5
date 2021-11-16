import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "src/entities/Employee";
import { EmployeeRepository } from "./employee.repository";
import * as bcrypt from "bcrypt";
import { EntityNotFoundError } from "typeorm";
import { GetEmployeeDto } from './employee.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import { Position } from '../entities/Position';
import { GetPositionDto } from '../position/position.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private employeeRepository: EmployeeRepository
  ) {}

  public async getEmployeeById(id: number) {
    return this.employeeRepository
      .createQueryBuilder()
      .where('id = :id', {id : id})
      .getOne()
  }

  public async getEmployee(param: GetEmployeeDto) {
    const query = this.employeeRepository
      .createQueryBuilder()

    console.log(param.name)
    if (param.email) {
      query
        .orWhere('email like :email', { email: `%${param.email}%`})
    }

    if (param.name) {
      query
        .orWhere('concat(last_name, " ", first_name) like :name',
          {name: `%${param.name}%`})
        .orWhere('concat(first_name, " ", last_name) like :name',
          {name: `%${param.name}%`})
    }

    const res =  await paginate<Employee>(query,
      { page: param.page == null ? GetPositionDto.DEFAULT_PAGE : param.page,
        limit: param.limit == null ? GetPositionDto.DEFAULT_LIMIT: param.limit,
      }
    )
      .then(r => r.items)

    console.log(res.length)

    return res;
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
