import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerModule } from './controllers/controller.module';
import { ENTITES } from './model';
import { ServiceModule } from './services/service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['src/config/config.base.env', 'src/config/config.prod.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PWD'),
          database: configService.get('DB_NAME'),
          synchronize: configService.get('DB_SYNCHRONIZE'),
          autoLoadEntities: true,
          logging: true,
        };
      },
    }),
    ControllerModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
