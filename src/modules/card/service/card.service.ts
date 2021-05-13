import { Injectable } from '@nestjs/common';
import { Card } from '@prisma/client';
import { Logger } from 'nestjs-pino';
import { ReviewStatusEnum } from 'src/shared/consts/common.const';
import { DbService } from 'src/shared/db/db.service';
import { CardListDto } from '../dto/card-list.dto';
import { CreateCardDto } from '../dto/create-card.dto';
import { UpdateCardDto } from '../dto/update-card.dto';
import { CoreService } from './core/core.service';

@Injectable()
export class CardService {
  constructor(
    private db: DbService,
    private coreService: CoreService,
    private logger: Logger,
  ) {}

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

  /**
   * review  card
   * @param card
   * @returns card
   */
  async reviewCard(cardId: number, status: ReviewStatusEnum): Promise<Card> {
    const card = await this.db.card.findUnique({ where: { id: cardId } });
    const updated = this.coreService.review(card, status);
    const result = await this.db.card.update({
      where: { id: card.id },
      data: updated,
    });
    return result;
  }

  /**
   * get cards by deckId with count
   * @returns
   * @version 0.2
   */
  async list(cardList: CardListDto): Promise<{ data: any[]; total: number }> {
    const [data, total] = await Promise.all([
      this.db.card.findMany({
        ...cardList,
        include: { notes: true },
      }),
      this.db.card.count(),
    ]);
    return { data, total };
  }

  async deleteCard(ids: number[]): Promise<void> {
    try {
      // AMEND performance improvement
      for await (const id of ids) {
        const deleteNotes = this.db.note.deleteMany({
          where: {
            cardId: id,
          },
        });
        const deletedCard = this.db.card.delete({
          where: {
            id,
          },
        });

        await this.db.$transaction([deleteNotes, deletedCard]);
      }
    } catch (error) {
      this.logger.error(error.toString());
    }
  }

  async getCardById(id: number) {
    return this.db.card.findFirst({
      where: { id },
      include: { notes: true },
    });
  }

  async updateCard(card: UpdateCardDto) {
    return this.db.card.update({
      where: {
        id: card.id,
      },
      data: card,
    });
  }
}
