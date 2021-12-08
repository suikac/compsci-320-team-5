import {
  Body,
  Controller,
  Delete,
  Get,
  Inject, Param,
  Patch,
  Post,
  Query,
  Req, Res,
  UploadedFile,
  UseGuards, UseInterceptors
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtGuard } from '../guards/jwt-guard';
import { ManagerOnly, RolesGuard } from '../guards/role.guards';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { firstValueFrom } from 'rxjs';


@UseGuards(JwtGuard, RolesGuard)
@Controller('referral')
export class ReferralController {
  constructor(@Inject('DB_SERVICE') private readonly dbService: ClientProxy) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  public async createReferral(@Req() req, @Body() data, @UploadedFile() resume) {
    console.log('Creating a new referral');
    data.referrerId = req.user.userId;
    data.create_date = new Date();
    const cmd = { cmd: 'createReferral' };
    try {
      return this.dbService.send(cmd, {
        data: data,
        resume: {
          file: resume ? resume.buffer : null, // store the file as string
          name: resume ? resume.originalname : null,
          type: resume ? resume.mimetype : null,
        },
      });
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
    return await this.dbService.send(cmd, data);
  }

  @Get('getReferral')
  public async getReferral(@Query('id') id: number) {
    console.log('Fetch an existing referral (by id)');
    const cmd = { cmd: 'getReferral' };
    const data = { id: id };
    return this.dbService.send(cmd, data);
  }

  @Get('file')
  public async getFile(@Res() res, @Query('id') id) {
    const data = await firstValueFrom(
      this.dbService.send({ cmd: 'getFile' }, { id: id })
    );
    const file = Buffer.from(data.data);
    // res.setHeader('Content-Type', data.type);
    res.send(file);
  }

  @Get('getReferralsByReferrer')
  public async getReferralsByReferrer(
    @Query('referrer_id') referrer_id: number
  ) {
    console.log('Fetch existing referrals (by referrer)');
    const cmd = { cmd: 'getReferralsByReferrer' };
    const data = { referrer_id };
    const response = this.dbService.send(cmd, data);
    return response;
  }

  @Get('getReferralsByPosition')
  public async getReferralsByPosition(
    @Query('position_id') position_id: number
  ) {
    console.log('Fetch existing referrals (by position)');
    const cmd = { cmd: 'getReferralsByPosition' };
    const data = { position_id };
    const response = this.dbService.send(cmd, data);
    return response;
  }

  @Post('read')
  public async read(@Req() req, @Body() body) {
    const cmd = { cmd: 'readReferral' };
    this.dbService.emit(cmd, body.id);
  }

  @Get('get')
  public async get(@Req() req, @Query() query) {
    const cmd = { cmd: 'getReferral' };
    console.log(req.user);
    query.referrerId = req.user.userId;
    console.log(query);
    try {
      return this.dbService.send(cmd, query);
    } catch (e) {
      throw e;
    }
  }
}
