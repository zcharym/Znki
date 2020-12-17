import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';
import { BaseTransformInterceptor } from './shared/interceptors/base-transform.interceptor';
import { HttpExceptionFilter } from './shared/interceptors/http-exception.filter';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new BaseTransformInterceptor());
  app.useGlobalInterceptors(new HttpExceptionFilter() as any);

  // global middleware

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
