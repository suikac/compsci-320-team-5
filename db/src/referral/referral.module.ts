import { Module } from '@nestjs/common';
import { ReferralService } from './referral.service';
import { ReferralController } from './referral.controller';

@Module({
  providers: [ReferralService],
  controllers: [ReferralController]
})
export class ReferralModule {}
