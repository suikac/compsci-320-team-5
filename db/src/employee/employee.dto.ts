import { IsOptional } from 'class-validator';

export class GetEmployeeDto {

  @IsOptional()
  email: string

  @IsOptional()
  name: string
}
