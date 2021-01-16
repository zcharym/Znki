import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Card } from '../../../models/card.model';

@Injectable()
export class CardService {
  constructor(@InjectRepository(Card) readonly cardRepo: Repository<Card>) {}

  async addCard() {}

  async list() {
    return this.cardRepo.find();
  }

  async deleteCard(id: number) {}
}
