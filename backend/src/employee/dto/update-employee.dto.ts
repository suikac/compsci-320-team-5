import { isNumber, IsString } from 'class-validator';

export class UpdateEmployeeDto {

  id: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  role: string;
}