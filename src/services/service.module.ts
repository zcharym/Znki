import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITES } from 'src/model';
import { RecordService } from './record.service';

@Module({
  imports: [TypeOrmModule.forFeature(ENTITES)],
  providers: [RecordService],
  exports: [RecordService],
})
export class ServiceModule {}
