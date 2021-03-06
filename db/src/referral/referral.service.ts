import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReferralRepository } from './referral.repository';
import { Referral } from '../entities/Referral';
import { CreateReferralDto, CreateResumeDto, GetReferralDto } from './referral.dto';
import { PositionService } from '../position/position.service';
import { EmployeeService } from '../employee/employee.service';
import { ResumeRepository } from './resume.repository';

@Injectable()
export class ReferralService {
  constructor(
    @InjectRepository(ReferralRepository)
    private readonly referralRepository: ReferralRepository,
    @Inject(PositionService)
    private readonly positionService: PositionService,
    @Inject(EmployeeService)
    private readonly employeeService: EmployeeService,
    @InjectRepository(ResumeRepository)
    private readonly resumeRepository: ResumeRepository,
  ) {}

  public async createReferral(createReferralDto: CreateReferralDto,
                              createResumeDto: CreateResumeDto) {
    if (createResumeDto.name != null) {
      createResumeDto.file = Buffer.from(createResumeDto.file)
      createReferralDto.resumeId = await this.resumeRepository
        .save(createResumeDto)
        .then(r => r.id)
    }
    await this.referralRepository
      .save(createReferralDto)
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
    return await this.referralRepository
      .createQueryBuilder('deleteReferral')
      .delete()
      .from(Referral)
      .where('id = :id', { id: id })
      .execute();
  }

  public async getReferral(id: number): Promise<Referral> {
    return await this.referralRepository
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
    const referrals = await this.referralRepository
      .createQueryBuilder('getUnreadReferral')
      .where('referrer_id = :id', { id })
      .andWhere('is_read = 0')
      .getMany();
    for (let i = 0; i < referrals.length; i++) {
      referrals[i] = await this.completeReferral(referrals[i]);
    }
    return referrals;
  }

  // some columns are id which has not meaning, this method adds
  // some fields according to that id fields
  private async completeReferral(referral: Referral): Promise<Referral> {
    referral.position = await this.positionService.getPositionById(
      referral.positionId.toString()
    );
    referral.referrer = await this.employeeService.getEmployeeById(
      referral.referrerId
    );
    if (referral.refereeId !== null) {
      referral.referee = await this.employeeService.getEmployeeById(
        referral.refereeId
      );
    }
    return referral;
  }

  public async readReferral(id: number) {
    await this.referralRepository
      .createQueryBuilder('readReferral')
      .update()
      .where('id = :id', { id })
      .set({ isRead: true })
      .execute();
  }

  public async get(data: GetReferralDto) {
    const query = this
      .referralRepository.createQueryBuilder('referral')
      .innerJoinAndSelect('referral.position', 'position')
      .where('referral.position_id = position.id')
      .innerJoinAndSelect('referral.referrer', 'referrer')
      .where('referral.referrer_id = referrer.id')
      .leftJoinAndSelect('referral.referee', 'referee')
      .where('referral.referee_id = referee_id');

    if (data.isManager == null) {
      query.where('referrer_id = :referrerId', { referrerId: data.referrerId });
    } else {
      query
        .where('position.manager_id = :managerId', {
          managerId: data.referrerId,
        });
    }

    if (data.isRead != null) {
      query.andWhere('is_read = :isRead', { isRead: data.isRead });
    }

    if (data.positionId != null) {
      query.andWhere('position_id = :positionId', {
        positionId: data.positionId,
      });
    }

    if (data.id != null) {
      query.andWhere('referral.id = :id', { id: data.id });
    }

    return await query.getMany();
  }

  public async getFile(id : number) {
    const file = await this.resumeRepository
      .createQueryBuilder()
      .where('id = :id', { id: id })
      .getOne()
    return {
      data: file.file,
      type: file.type
    };
  }
}
