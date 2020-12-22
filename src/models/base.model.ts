import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'create_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'update_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updatedAt: Date;
}
