import {Repository, EntityRepository} from "typeorm"
import { Employee } from "./employee.entity"
import { CreateEmployeeDto } from "./dto/create-employee.dto"

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
    public async createEmployee(
        createEmployeeDto: CreateEmployeeDto
    ): Promise<Employee> {
        const {name, email, role} = createEmployeeDto

        const employee = new Employee();
        employee.email = email;
        employee.name = name;
        employee.role = role;

        await employee.save();
        return employee
    }
}