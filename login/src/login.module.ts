import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
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
      },
      {
        name: 'DB_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3001
        }
      }
    ])
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
