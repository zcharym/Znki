import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../../models';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [TagService],
  controllers: [TagController],
})
export class RecordModule {}
