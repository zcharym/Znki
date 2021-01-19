import { Module } from '@nestjs/common';
import { JwtUtilService } from './jwt-util.service';

@Module({
  imports: [],
  controllers: [],
  providers: [JwtUtilService],
  exports: [JwtUtilService],
})
export class SharedModule {}
