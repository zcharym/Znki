import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DeckService } from '../service/deck.service';

@ApiTags('Deck')
@Controller('deck')
export class DeckController {
  constructor(private deckService: DeckService) {}

  @Post()
  async addDeck() {
    return this.deckService.createDeck();
  }
}
