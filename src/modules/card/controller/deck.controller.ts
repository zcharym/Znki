import { Controller, Get, Post } from '@nestjs/common';
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

  // TODO add @User auth
  @Get()
  async getDecks() {
    return this.deckService.list();
  }
}
