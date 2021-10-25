import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtGuard } from '../guards/jwt-guard';
import { ManagerOnly, RolesGuard } from '../guards/role.guards';

@UseGuards(JwtGuard, RolesGuard)
@Controller('referral')
export class ReferralController {
  constructor(@Inject('DB_SERVICE') private readonly dbService: ClientProxy) {}

  @Post('create')
  public async createReferral(@Req() req, @Body() data) {
    console.log('Creating a new referral');
    data.referrerId = req.user.userId;
    data.create_date = new Date();
    const cmd = { cmd: 'createReferral' };
    console.log(data);
    try {
      return this.dbService.send(cmd, data);
    } catch (e) {
      throw e;
    }
  }

  @Patch('updateReferral')
  public async updateReferral(@Req() req, @Body() data) {
    console.log('Updating an existing referral');
    const cmd = { cmd: 'updateReferral' };
    try {
      return this.dbService.send(cmd, data);
    } catch (e) {
      throw e;
    }
  }

  @Delete('deleteReferral')
  public async deleteReferral(@Query('id') id: number) {
    console.log('Delete an existing referral');
    console.log('backend' + id);
    const cmd = { cmd: 'deleteReferral' };
    const data = { id: id };
    this.dbService.send(cmd, data);
  }

  @Get('getReferral')
  public async getReferral(@Query('id') id: number) {
    console.log('Fetch an existing referral (by id)');
    const cmd = { cmd: 'getReferral' };
    const data = { id: id };
    return this.dbService.send(cmd, data);
  }

  @Get('getReferralsByReferrer')
  public async getReferralsByReferrer(
    @Query('referrer_id') referrer_id: number,
  ) {
    console.log('Fetch existing referrals (by referrer)');
    const cmd = { cmd: 'getReferralsByReferrer' };
    const data = { referrer_id };
    const response = this.dbService.send(cmd, data);
    return response;
  }

  @Get('getReferralsByPosition')
  public async getReferralsByPosition(
    @Query('position_id') position_id: number,
  ) {
    console.log('Fetch existing referrals (by position)');
    const cmd = { cmd: 'getReferralsByPosition' };
    const data = { position_id };
    const response = this.dbService.send(cmd, data);
    return response;
  }

  @ManagerOnly()
  @Get('getUnread')
  public async getUnreadReferral(@Req() req) {
    const cmd = { cmd: 'getUnreadReferral' };
    return this.dbService.send(cmd, req.user.userId);
  }

  @Post('read')
  public async read(@Req() req, @Body() body) {
    const cmd = { cmd: 'readReferral' };
    this.dbService.emit(cmd, body.id);
  }
}
