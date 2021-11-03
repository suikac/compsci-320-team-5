import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReferralRepository } from './referral.repository';
import { Referral } from '../entities/Referral';
import { CreateReferralDto } from './referral.dto';

@Injectable()
export class ReferralService {
  constructor(
    @InjectRepository(ReferralRepository)
    private readonly referralRepository: ReferralRepository
  ) {}

  public async createReferral(createReferralDto: CreateReferralDto) {
    await this.referralRepository
      .createQueryBuilder('createReferral')
      .insert()
      .into(Referral)
      .values(createReferralDto)
      .execute();
    return createReferralDto;
  }

  public async updateReferral(
    updateReferralDto: CreateReferralDto,
    id: number
  ) {
    await this.referralRepository
      .createQueryBuilder('updateReferral')
      .update(Referral)
      .set(updateReferralDto)
      .where('id = :id', { id })
      .execute();
    return updateReferralDto;
  }

  public async deleteReferral(id: number) {
    await this.referralRepository
      .createQueryBuilder('deleteReferral')
      .delete()
      .from(Referral)
      .where('id = :id', { id })
      .execute();
  }

  public async getReferral(id: number): Promise<Referral> {
    return this.referralRepository
      .createQueryBuilder('getReferral')
      .where('id = :id', { id })
      .getOne();
  }

  public async getReferralsByPosition(positionId: number): Promise<Referral[]> {
    return this.referralRepository
      .createQueryBuilder('getReferralsByPosition')
      .where('position_id = :positionId', { positionId })
      .getMany();
  }

  public async getReferralsByReferrer(referrerId: number): Promise<Referral[]> {
    return this.referralRepository
      .createQueryBuilder('getReferralsByEmployee')
      .where('referrer_id = :referrerId', { referrerId })
      .getMany();
  }

  public async getUnreadReferral(id: number): Promise<Referral[]> {
    return this.referralRepository
      .createQueryBuilder('getUnreadReferral')
      .where('referrer_id = :id', { id })
      .andWhere('is_read = 0')
      .getMany();
  }

  public async readReferral(id: number) {
    console.log(id);
    await this.referralRepository
      .createQueryBuilder('readReferral')
      .update()
      .where('id = :id', { id })
      .set({ isRead: true })
      .execute();
  }
}
