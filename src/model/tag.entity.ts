import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Group } from './group.entity';
import { Record } from './record.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column({ type: 'int', name: 'record_id' })
  recordId: number;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => Group, (c) => c.records)
  @JoinColumn({ name: 'record_id' })
  record?: Record;
}
