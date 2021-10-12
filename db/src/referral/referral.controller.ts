import { Controller, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ReferralService } from "./referral.service";
import { Referral } from "../entities/Referral";

@Controller('referral')
export class ReferralController {

  constructor(
    @Inject(ReferralService)
    private readonly referralService: ReferralService
  ) {
  }

  @MessagePattern('createReferral')
  public async createReferral() {
    await this.referralService.createReferral()
  }

  @MessagePattern('updateReferral')
  public async updateReferral() {
    await this.referralService.updateReferral()
  }

  @MessagePattern('deleteReferral')
  public async deleteReferral() {
    await this.referralService.deleteReferral()
  }

  @MessagePattern({cmd: 'getReferral'} )
  public async getReferral(id: number) : Promise<Referral> {
    return await this.referralService.getReferral(id);
  }
}
