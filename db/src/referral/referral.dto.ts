// data transfer object for creating
import { isNumberObject } from 'util/types';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ParseIntPipe } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import * as buffer from 'buffer';
import * as Buffer from 'buffer';

export class CreateReferralDto {
  resumeId: number;

  @IsEmail()
  refereeEmail: string;

  description: string;

  refereeName: string;

  refereeId: number;

  @IsNotEmpty()
  positionId: number;

  @IsNotEmpty()
  referrerId: number;

  id: number;

}

export class GetReferralDto {
  @Type(() => Number)
  @IsInt()
  @IsNumberString()
  @IsOptional()
  id: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  isRead: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  referrerId: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  positionId: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  isManager: number;
}

export class CreateResumeDto{
  resume: Buffer

  name: string
}
