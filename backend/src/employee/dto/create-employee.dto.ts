import { IsString } from 'class-validator';

export class CreateEmployeeDto {

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  role: string;
}