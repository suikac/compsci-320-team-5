import { IsInt, isInt, IsString, isString } from 'class-validator';

export class CreateEmployeeDto { // validate the correctness of every field

    @IsString()
    first_name: String

    @IsString()
    last_name: string

    @IsString()
    email: string
    
    @IsString()
    company_name: string

    @IsString()
    manager_id: string

    @IsString()
    position_title: string

    @IsString()
    start_date: Date

    @IsString()
    is_manager: boolean

    @IsString()
    password: string

    @IsString()
    resume_id: string  
}