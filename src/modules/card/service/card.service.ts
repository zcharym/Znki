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
  async addCardAndNote(item: CreateCardAndNoteDto) {
    // TODO dto 和 prisma crud 完美结合
    if (item.notes) {
      await this.db.card.create({
        data: item,
      });
    } else {
    }
  }

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

  async getCardById(id: number) {
    return this.db.card.findFirst({
      where: { id },
      include: { notes: true },
    });
  }
}
