import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { GuardsModule } from './guards/guards.module';

require('dotenv').config();

@Module({
  imports: [GuardsModule, ApiModule],
})
export class AppModule {}
