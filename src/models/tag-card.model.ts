import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('tag_card', { schema: 'znki' })
export class TagCard extends BaseModel {
  @Column('int', { name: 'tid', comment: 'tag id' })
  tid: number;

  @Column('int', { name: 'cid' })
  cid: number;
}
