import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({
    type: 'timestamp',
    name: 'create_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: string;
}
