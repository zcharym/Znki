import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as deckConfig from '../../../config/deck.conf.json';
import { Deck } from '../../../models/deck.model';
import { CreateDeckDto } from '../dto/create-deck.dto';

@Injectable()
export class DeckService {
  constructor(@InjectRepository(Deck) readonly deckRepo: Repository<Deck>) {}

  async createDeck(newDeck: CreateDeckDto, userId: number): Promise<number> {
    const deck = await this.deckRepo.save({
      conf: JSON.stringify(newDeck.conf || deckConfig.default),
      userId,
      isPublic: newDeck.isPublic,
      name: newDeck.name,
      description: newDeck.description,
    });
    return deck.id;
  }

  async list() {
    return this.deckRepo.find();
  }
}
