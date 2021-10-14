import { Module } from '@nestjs/common';
import { AppController } from './guards/app.controller';
import { DbModule } from './db/db.module';
import { GuardsModule } from './guards/guards.module';
require('dotenv').config();

@Module({
  imports: [DbModule, GuardsModule],
})
export class AppModule {}
