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

  @Column({ type: 'int', name: 'repo_id' })
  repoId: number;

  @Column({ type: 'timestamp', name: 'create_at' })
  creatAt: string;

  @Column({ type: 'timestamp', name: 'update_at' })
  updateAt: string;

  @Column({ type: 'boolean', default: false })
  isRemembered: boolean;
}
