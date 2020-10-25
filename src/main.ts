import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
  });
}
bootstrap();
