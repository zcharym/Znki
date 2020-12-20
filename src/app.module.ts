import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordModule } from './modules/record/record.module';
import { UserModule } from './modules/user/user.module';

const ENV = process.env.NODE_ENV;
const configPath =
  ENV === 'production'
    ? 'src/config/config.prod.env'
    : 'src/config/config.dev.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [configPath],
      isGlobal: true,
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
          logging: configService.get('DB_LOGGING'),
        };
      },
    }),
    RecordModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
