import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtGuard } from './jwt-guard';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'LOGIN_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 1234
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService, JwtGuard],
})
export class AppModule {}
