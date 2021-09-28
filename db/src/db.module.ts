import { Module } from '@nestjs/common';
import { LoginController } from './db.controller';
import { LoginService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './entities/Employee';
import { Resume } from './entities/Resume';
import { Referral } from './entities/Referral';
import { Position } from './entities/Position';
import { PositionTag } from './entities/PositionTag';
import { Tag } from './entities/Tag';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'BACKEND_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3000
        }
      }
    ]),
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'aki',
        //entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        entities: [Employee, Referral, Resume, Position, PositionTag, Tag],
        synchronize: true,
      }
    ),
    EmployeeModule
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class DbModule {}
