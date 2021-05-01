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

const ENV = process.env.NODE_ENV;
const configPath = ENV === 'production' ? '.env.prod' : '.env';

@Module({
  imports: [
    DbModule,
    ConfigModule.forRoot({
      envFilePath: [configPath],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    CardModule,
    UserModule,
    AuthModule,
    CommonModule,
    ObsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
