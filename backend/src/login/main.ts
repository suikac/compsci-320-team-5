import { NestFactory } from '@nestjs/core';
import { LoginModule } from './login.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(LoginModule);
  await app.listen();
}
bootstrap();
