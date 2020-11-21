import { BaseEntity } from './base.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ChildTag extends BaseEntity {
  @Column({ type: 'int' })
  tagId: number;

  @Column({ type: 'varchar' })
  name: string;
}
