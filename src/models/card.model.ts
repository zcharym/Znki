import { Column, Entity } from 'typeorm';

import { BaseModel } from './base.model';

@Entity('cards', { schema: 'znki' })
export class Card extends BaseModel {
  @Column('int', { name: 'did', comment: 'deck id' })
  did: number;

  @Column('int', { name: 'tid', comment: 'template id', default: -1 })
  tid: number;

  @Column('int', {
    name: 'type',
    comment: '0-new, 1-learning, 2-review, (3-relearning)',
    default: () => "'0'",
  })
  type: number;

  @Column('timestamp', {
    name: 'due',
    nullable: true,
    comment:
      "default;due: integer day, relative to the collection's creation time;learning: integer timestamp",
  })
  due: Date | null;

  @Column('int', {
    name: 'reviews',
    comment: 'reviewing time',
    default: () => "'0'",
  })
  reviews: number;
}
