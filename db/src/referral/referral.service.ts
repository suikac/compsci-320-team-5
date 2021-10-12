import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ReferralRepository } from "./referral.repository";
import { Referral } from "../entities/Referral";

@Injectable()
export class ReferralService {
  constructor(
    @InjectRepository(ReferralRepository)
    private readonly referralRepository: ReferralRepository
  ) {}

  public async createReferral() {
    // implement it
  }

  public async updateReferral() {
    // implement it
  }

  public async deleteReferral() {
    // implement it

  }

  public async getReferral(id : number) : Promise<Referral> {
    // implement it
   return this.referralRepository
      .createQueryBuilder('referral')
      .where('id = :id', {id : id})
      .getOne()
  }
}
