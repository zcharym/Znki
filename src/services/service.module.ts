import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITES } from 'src/model';
import { RecordBaseService } from './record';

@Module({
  imports: [TypeOrmModule.forFeature(ENTITES)],
  providers: [RecordBaseService],
  exports: [RecordBaseService],
})
export class ServiceModule {}
