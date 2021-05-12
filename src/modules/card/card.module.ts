import { Module } from '@nestjs/common';
import { DbModule } from 'src/shared/db/db.module';
import { CardController } from './controller/card.controller';
import { DeckController } from './controller/deck.controller';
import { NoteController } from './controller/note.controller';
import { TagController } from './controller/tag.controller';
import { CardService } from './service/card.service';
import { DeckService } from './service/deck.service';
import { NoteService } from './service/note.service';
import { TagService } from './service/tag.service';
import { CoreService } from './service/core/core.service';

@Module({
  imports: [DbModule],
  providers: [TagService, CardService, DeckService, NoteService, CoreService],
  controllers: [TagController, CardController, DeckController, NoteController],
})
export class CardModule {}
