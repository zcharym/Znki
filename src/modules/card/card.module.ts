import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { entities } from '../../models';
import { CardController } from './controller/card.controller';
import { DeckController } from './controller/deck.controller';
import { TagController } from './controller/tag.controller';
import { CardService } from './service/card.service';
import { DeckService } from './service/deck.service';
import { TagService } from './service/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [TagService, CardService, DeckService],
  controllers: [TagController, CardController, DeckController],
})
export class CardModule {}
