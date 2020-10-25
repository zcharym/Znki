import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Record {
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

  @Column({
    type: 'timestamp',
    name: 'create_at',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  creatAt: Date;

  @Column({
    type: 'timestamp',
    name: 'update_at',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updateAt: Date;

  @Column({ type: 'boolean', default: false })
  isRemembered: boolean;
}
