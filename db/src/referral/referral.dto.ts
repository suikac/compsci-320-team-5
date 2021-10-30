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
  isRead: number;

  @IsNumber()
  referrerId: number;

  @IsNumberString()
  positionId: number;
}
