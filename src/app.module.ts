import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CardModule } from './modules/card/card.module';
import { UserModule } from './modules/user/user.module';
import { DbModule } from './shared/db/db.module';
import { CommonModule } from './common/common.module';
import { ObsModule } from './modules/obs/obs.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { NotionModule } from './modules/notion/notion.module';
import { RedisModule } from 'nestjs-redis';

const ENV = process.env.NODE_ENV;
const configPath = ENV === 'production' ? '.env.prod' : '.env';

@Module({
  imports: [
    DbModule,
    ConfigModule.forRoot({
      envFilePath: [configPath],
      isGlobal: true,
    }),
    RedisModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        host: config.get<string>('REDIS_SERVER'),
        password: config.get<string>('REDIS_PWD'),
        port: config.get<number>('REDIS_PORT'),
        keyPrefix: 'znki',
        db: config.get<number>('REDIS_DB'),
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get<number>('THROTTLE_TTL'),
        limit: config.get<number>('THROTTLE_LIMIT'),
      }),
    }),
    LoggerModule.forRoot({
      // TODO format this
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        prettyPrint: true,
        autoLogging: false,
      },
    }),
    CardModule,
    UserModule,
    AuthModule,
    CommonModule,
    ObsModule,
    NotionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
