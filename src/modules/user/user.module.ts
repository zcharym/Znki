import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITES } from '../../model';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature(ENTITES)],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {
}
