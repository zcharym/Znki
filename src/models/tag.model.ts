import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('tags', { schema: 'znki' })
export class Tag extends BaseModel {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('int', {
    name: 'type',
    comment: '0-default,1-tech-interviews,2-reference',
    default: () => "'0'",
  })
  type: number;
}
