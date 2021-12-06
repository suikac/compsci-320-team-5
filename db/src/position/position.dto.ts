import { Optional } from '@nestjs/common';
import { IsNumberString, IsOptional } from 'class-validator';
import { BasicGetDto } from '../interface/BasicGetDto';

export class GetPositionDto extends BasicGetDto{

  @IsOptional()
  @IsNumberString()
  minSalary: number

  @IsNumberString()
  @IsOptional()
  maxSalary: number

  @IsOptional()
  title: string

  @IsOptional()
  minYearExperience: number

  @IsOptional()
  managerName: string

  @IsOptional()
  managerEmail: string

  @IsOptional()
  tags: string[]
}

export class GetTagsDto extends BasicGetDto{
  name: string
}
