import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeService } from './employee/employee.service';
import { CatsController } from './cat.controller';
import { EmployeeModule } from './employee/employee.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'aki',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }), EmployeeModule, LoginModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
