import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as deckConfig from '../../../config/deck.conf.json';
import { Deck } from '../../../models/deck.model';

@Injectable()
export class DeckService {
  constructor(@InjectRepository(Deck) readonly deckRepo: Repository<Deck>) {}

  async createDeck(conf?: Record<string, unknown>): Promise<number> {
    const deck = await this.deckRepo.save({
      conf: JSON.stringify(conf || deckConfig.default),
    });
    return deck.id;
  }
}
