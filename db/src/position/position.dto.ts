import { Optional } from '@nestjs/common';
import { IsNumberString, IsOptional } from 'class-validator';

export class GetPositionDto {

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
  tags: string[]
}

export class GetTagsDto {
  name: string
}
