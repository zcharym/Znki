import { BaseEntity } from './base.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tag extends BaseEntity {
  @Column({ type: 'int' })
  recordId: number;

  @Column({ type: 'varchar' })
  name: string;
}
