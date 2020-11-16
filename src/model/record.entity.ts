import { BaseEntity } from './base.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Record extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  zKey: string;

  @Column({ type: 'varchar' })
  zValue: string;

  @Column({ type: 'int', default: 0 })
  priority: number;

  @Column({ type: 'int', name: 'repo_id', nullable: true })
  repoId: number;

  @Column({ type: 'boolean', default: false })
  isRemembered: boolean;
}
