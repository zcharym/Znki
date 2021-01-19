import { Column, Entity } from 'typeorm';

import { BaseModel } from './base.model';

/**
 * Deck
 *
 * DIY conf for cards, implements as surface of a notebook.
 */
@Entity('decks', { schema: 'znki' })
export class Deck extends BaseModel {
  @Column('int', { name: 'version', default: () => "'0'" })
  version: number;

  @Column('varchar')
  name: string;

  @Column('varchar', { nullable: true })
  description: string;

  @Column('text', {
    name: 'conf',
    nullable: true,
    comment: 'json object containing configuration options',
  })
  conf: string | null;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('tinyint', { name: 'is_pubic', default: () => "'0'" })
  isPublic: boolean;
}
