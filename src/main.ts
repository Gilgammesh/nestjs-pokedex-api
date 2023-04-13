import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(AppConfig().appGlobalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
  await app.listen(process.env.PORT);
  console.log('PORT =>', process.env.PORT);
  console.log('PORT =>', process.env.appPort);
  console.log('MONGO_DB_CONNECTION_STRING =>', process.env.MONGO_DB_CONNECTION_STRING);
  console.log('MONGO_DB_CONNECTION_STRING =>', process.env.mongoDbConnectionString);
}
bootstrap();
