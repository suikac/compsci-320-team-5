// data transfer object for creating
import { isNumberObject } from 'util/types';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

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
  @IsBoolean()
  isRead: boolean;

  @IsNumber()
  id: number;

  @IsString()
  referrerId: string;
}
