import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('notes', { schema: 'znki' })
export class Note extends BaseModel {
  @Column('int', { name: 'tid', comment: 'template id', default: () => "'0'" })
  tid: number;

  @Column('int', {
    name: 'csum',
    nullable: true,
    comment: 'use first 8 digits sha1 hash to check duplicate deck',
  })
  csum: number | null;

  @Column('varchar', { name: 'zkey', length: 255 })
  zkey: string;

  @Column('text', { name: 'zValue' })
  zValue: string;

  @Column('int', { name: 'cid', comment: 'card id' })
  cid: number;

  @Column('int', {
    name: 'type',
    default: () => "'0'",
    comment: '0-text;1-image',
  })
  type: number;
}
