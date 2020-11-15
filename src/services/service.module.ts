import { TagService } from './record/tag.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITES } from 'src/model';
import { RecordBaseService } from './record';

@Module({
  imports: [TypeOrmModule.forFeature(ENTITES)],
  providers: [RecordBaseService, TagService],
  exports: [RecordBaseService],
})
export class ServiceModule {}
