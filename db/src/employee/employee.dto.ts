import { IsOptional } from 'class-validator';
import { BasicGetDto } from '../interface/BasicGetDto';

export class GetEmployeeDto extends BasicGetDto {

  @IsOptional()
  email: string

  @IsOptional()
  name: string
}
