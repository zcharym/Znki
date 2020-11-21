import { Module } from '@nestjs/common';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITES } from '../../model';

@Module({
  imports: [TypeOrmModule.forFeature(ENTITES)],
  providers: [RecordService],
  controllers: [RecordController],
})
export class RecordModule {
}
