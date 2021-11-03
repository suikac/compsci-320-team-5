// data transfer object for creating
import { isNumberObject } from 'util/types';
import { IsEmail, IsNotEmpty } from 'class-validator';

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
