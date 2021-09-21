import {Repository, EntityRepository, BaseEntity} from "typeorm"
import { Employee } from "./employee.entity"
import { CreateEmployeeDto } from "./dto/create-employee.dto"
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
    public async createEmployee(
        createEmployeeDto: CreateEmployeeDto
    ): Promise<Employee> {
        const {name, email, role} = createEmployeeDto
        console.log(role)
        console.log(email)
        const employee = new Employee();
        employee.email = email;
        employee.name = name;
        employee.role = role;

        await employee.save();
        return employee
    }

    public async updateEmployee(
        updateEmployeeDto: CreateEmployeeDto,
        editEmployee: Employee
    ) : Promise<Employee> {
        const {name, email, role} = updateEmployeeDto
        
        editEmployee.name = name
        editEmployee.email = email
        editEmployee.role = role

        await editEmployee.save()
        return editEmployee
    }

}