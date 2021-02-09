import { Injectable } from '@nestjs/common';
import * as deckConfig from '../../../config/deck.conf.json';
import { CreateDeckDto } from '../dto/create-deck.dto';
import { DbService } from 'src/shared/db/db.service';

@Injectable()
export class DeckService {
  constructor(private db: DbService) {}

  async createDeck(newDeck: CreateDeckDto, userId: number): Promise<number> {
    const deck = await this.db.deck.create({
      data: {
        conf: JSON.stringify(newDeck.conf || deckConfig.default),
        userId,
        isPublic: newDeck.isPublic,
        name: newDeck.name,
        description: newDeck.description,
      },
    });

    return deck.id;
  }

  async list() {
    return this.db.deck.findMany();
  }
}
