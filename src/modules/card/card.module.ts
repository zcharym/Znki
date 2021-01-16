import { Module } from '@nestjs/common';
import { TagController } from './controller/tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../../models';
import { TagService } from './service/tag.service';
import { CardController } from './controller/card.controller';
import { CardService } from './service/card.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [TagService, CardService],
  controllers: [TagController, CardController],
})
export class CardModule {}
