import cookieParser from 'cookie-parser';
import * as express from 'express';
import session from 'express-session';
import { SECRET_KEY } from 'src/config/config.json';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';
import { BaseTransformInterceptor } from './shared/interceptors/base-transform.interceptor';
import { HttpExceptionFilter } from './shared/interceptors/http-exception.filter';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const globalPrefix = 'api';

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new BaseTransformInterceptor());
  app.useGlobalInterceptors(new HttpExceptionFilter() as any);
  // global middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // swagger
  const options = new DocumentBuilder()
    .setTitle('Znki API')
    .setDescription('znki apis')
    .setVersion('0.1')
    .setContact(
      'ZcharyMa',
      'https://www.github.com/zchary-ma',
      'zcharyma@gmail.com',
    )
    .addBearerAuth(
      {
        type: 'http',
      },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(port, () => {
    console.log(`Server is running on port:http://localhost:${port}`);
  });
}

bootstrap();
