// data transfer object for creating
import { isNumberObject } from 'util/types';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber, IsNumberString, IsOptional,
  IsString
} from "class-validator";

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

  @IsNumberString()
  @IsOptional()
  id: number;

  @IsNumberString()
  @IsOptional()
  isRead: number;

  @IsNumber()
  @IsOptional()
  referrerId: number;

  @IsNumberString()
  @IsOptional()
  positionId: number;

  @IsNumberString()
  @IsOptional()
  isManager: number;
}
