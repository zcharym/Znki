import { Card } from 'src/models/card.model';
import { Note } from 'src/models/note.model';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) readonly cardRepo: Repository<Card>,
    @InjectRepository(Note) readonly noteRepo: Repository<Note>,
  ) {}

  async addCard(newCard: Partial<Card>): Promise<number> {
    const card = await this.cardRepo.save(newCard);
    return card.id;
  }

  async list() {
    return this.cardRepo.find();
  }

  async deleteCard(id: number) {}

  async getCardDetailById(cardId: number) {
    return this.noteRepo
      .createQueryBuilder('note')
      .select()
      .leftJoinAndSelect(Card, 'card', 'card.id = note.cid')
      .where('card.id = :cardId', { cardId })
      .getMany();
  }
}
