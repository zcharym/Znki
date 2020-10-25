import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  recordId: number;
}
