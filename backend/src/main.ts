import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // グローバルなバリデーションパイプを設定
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTOに含まれないプロパティを自動的に取り除く
      forbidNonWhitelisted: true, // DTOに存在しないプロパティが含まれている場合にエラーを返す
      transform: true, // リクエストボディをDTOの型に自動変換
    }),
  );

  // CORSを有効化
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
