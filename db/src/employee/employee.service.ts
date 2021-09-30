import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "src/entities/Employee";
import { EmployeeRepository } from "./employee.repository";
import * as bcrypt from "bcrypt";

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

  public async getEmployeeByEmail(email: String): Promise<Employee> {
    const employee = this.employeeRepository
      .createQueryBuilder("Employee")
      .where("email = :email", { email: email })
      .getOne();

    return employee;
  }

  public async signUpEmployee(email: string, password: string) {
    this.employeeRepository
      .createQueryBuilder()
      .insert()
      .into("employee")
      .values({
        email: email,
        password: await bcrypt.hash(password, await bcrypt.genSalt()),
      })
      .execute();
  }
}
