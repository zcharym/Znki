import { Module } from '@nestjs/common';
import { DbModule } from 'src/shared/db/db.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DbModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
