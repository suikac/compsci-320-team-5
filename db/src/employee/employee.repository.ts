import { Employee } from 'src/entities/Employee';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
  public async signUpEmployee() {}
}
