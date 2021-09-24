import {Repository, EntityRepository, BaseEntity} from "typeorm"
import { Employee } from "../entitie/Employee";

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
    public async createEmployee(
        createEmployeeDto: CreateEmployeeDto
    ): Promise<Employee> {
        const {first_name, last_name, email,
        company_name, manager_id, position_title, 
    } = createEmployeeDto
        Employee

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