import { Injectable } from '@nestjs/common';
import { Card, Prisma } from '@prisma/client';
import { DbService } from 'src/shared/db/db.service';
import { CreateCardAndNoteDto } from '../dto/create-card-and-note.dto';

@Injectable()
export class CardService {
  constructor(private db: DbService) {}

  /**
   * add card and its note
   *
   */
  async addCardAndNote(content: CreateCardAndNoteDto) {}

  async addCard(newCard: Prisma.CardCreateInput): Promise<number> {
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
