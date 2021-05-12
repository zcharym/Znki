import { Prisma, Card, CardStatusEnum } from '@prisma/client';

export class CardBaseDto implements Card {
  id: number;
  deckId: number;
  templateId: number;
  title: string;
  status: CardStatusEnum;
  interval: number;
  efactor: number;
  due: Date;
  reviews: number;
  createAt: Date;
  updateAt: Date;
}
