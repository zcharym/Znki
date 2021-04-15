import { Injectable } from '@nestjs/common';
import { Card, Prisma } from '@prisma/client';
import { DbService } from 'src/shared/db/db.service';
import { CreateCardDto } from '../dto/create-card.dto';

@Injectable()
export class CardService {
  constructor(private db: DbService) {}

  /**
   * create card with at least one note
   * @param card
   * @returns id
   */
  async addCard(card: CreateCardDto): Promise<number> {
    const notes = card.notes;
    const result = await this.db.card.create({
      data: {
        deckId: card.deckId,
        title: card.title,
        notes: {
          create: notes,
        },
      },
    });
    return result.id;
  }

  async list() {
    return this.db.card.findMany();
  }

  async deleteCard(id: number) {}

  async getCardById(id: number) {
    return this.db.card.findFirst({
      where: { id },
      include: { notes: true },
    });
  }
}
