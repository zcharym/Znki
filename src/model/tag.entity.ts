import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Record } from './record.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column({ type: 'int', name: 'record_id' })
  recordId: number;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => Record, (c) => c.tags)
  @JoinColumn({ name: 'record_id' })
  record?: Record;
}
