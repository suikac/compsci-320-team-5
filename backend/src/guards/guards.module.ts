import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoginController } from './login.controller';

@Global()
@Module({})
export class GuardsModule {
  static forRoot(): DynamicModule {
    const loginService = ClientsModule.register([
      {
        name: 'LOGIN_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.login_host,
          port: 1234,
        },
      },
    ]);
    return {
      imports: [loginService],
      module: GuardsModule,
      exports: [loginService],
      controllers: [LoginController],
    };
  }
}
