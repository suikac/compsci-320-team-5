import { Optional } from '@nestjs/common';
import { IsNumberString } from 'class-validator';

export class getPositionDto {

  @IsNumberString()
  @Optional()
  minSalary: number

  @IsNumberString()

  maxSalary: number

  jobTitle: string

  minExperience: number

  managerName: string

  @Optional()
  tags: string[]
}

export class getTagsDto {
  name: string
}
