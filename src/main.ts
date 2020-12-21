import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';
import { BaseTransformInterceptor } from './shared/interceptors/base-transform.interceptor';
import { HttpExceptionFilter } from './shared/interceptors/http-exception.filter';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { SECRET_KEY } from 'src/config/config.json';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const globalPrefix = 'api';

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new BaseTransformInterceptor());
  app.useGlobalInterceptors(new HttpExceptionFilter() as any);
  // global middleware
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  app.use(cookieParser());
  /**
   * @TODO session endurance
   * The default server-side session storage is purposely not designed for a production environment.
   * It will leak memory under most conditions,
   * does not scale past a single process,
   * and is meant for debugging and developing.
   * Read more in the official repository.
   */
  app.use(
    session({
      secret: SECRET_KEY,
      store: new session.MemoryStore(),
      cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
      resave: false, // 强制保存session即使它并没有变化, don’t save session if unmodified
      saveUninitialized: true, // 强制将未初始化的session存储
    }),
  );

  // swagger
  const options = new DocumentBuilder()
    .setTitle('Znki API')
    .setDescription('')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
  });
}

bootstrap();
