import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('decks', { schema: 'znki' })
export class Deck extends BaseModel {
  @Column('int', { name: 'version', default: () => "'0'" })
  version: number;

  @Column('text', {
    name: 'conf',
    nullable: true,
    comment: 'json object containing configuration options',
  })
  conf: string | null;
}
