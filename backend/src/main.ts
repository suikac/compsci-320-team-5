import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // these 2 fields are needed so that browser will store/send token cookies
    credentials: true,
    origin: "http://localhost:3002"
  })
  app.setGlobalPrefix('api')
  await app.listen(3000);
}
bootstrap();
