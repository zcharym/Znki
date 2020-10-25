import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'int', name: 'record_id' })
  recordId: number;
}
