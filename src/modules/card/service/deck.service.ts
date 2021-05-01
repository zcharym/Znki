import { Injectable } from '@nestjs/common';
import { CreateDeckDto } from '../dto/create-deck.dto';
import { DbService } from 'src/shared/db/db.service';
import { DeckListDto } from '../dto/deck-list.dto';

@Injectable()
export class DeckService {
  constructor(private db: DbService) {}

  async createDeck(newDeck: CreateDeckDto, userId: number): Promise<number> {
    const deck = await this.db.deck.create({
      data: {
        conf: JSON.stringify(newDeck.conf),
        userId,
        isPublic: newDeck.isPublic,
        name: newDeck.name,
        description: newDeck.description,
      },
    });

    return deck.id;
  }

  async list(deck: DeckListDto, userId: number) {
    return this.db.deck.findMany({
      where: {
        userId,
      },
      orderBy: {
        createAt: 'asc',
      },
      take: deck.take || 5,
      skip: deck.skip || 0,
    });
  }
}
