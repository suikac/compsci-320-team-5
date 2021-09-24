import { Module } from '@nestjs/common';
import { LoginController } from './db.controller';
import { LoginService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'BACKEND_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3000
        }
      }
    ])
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class DbModule {}
