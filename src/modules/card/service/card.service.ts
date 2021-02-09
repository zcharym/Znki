import { Injectable } from '@nestjs/common';
import { Card } from '@prisma/client';
import { DbService } from 'src/shared/db/db.service';

@Injectable()
export class CardService {
  constructor(private db: DbService) {}

  async addCard(newCard: Partial<Card>): Promise<number> {
    const card = await this.db.card.create({
      data: newCard,
    });
    return card.id;
  }

  async list() {
    return this.db.card.findMany();
  }

  async deleteCard(id: number) {}

  async getCardDetailById(cardId: number) {
    return this.db.card.delete({
      where: {},
    });
    // return this.noteRepo
    //   .createQueryBuilder('note')
    //   .select()
    //   .leftJoinAndSelect(Card, 'card', 'card.id = note.cid')
    //   .where('card.id = :cardId', { cardId })
    //   .getMany();
  }
}
