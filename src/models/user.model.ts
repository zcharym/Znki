import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('users', { schema: 'znki' })
export class User extends BaseModel {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  pwd: string;

  @Column({ type: 'varchar', nullable: true, default: () => 'NULL' })
  avatar: string;

  @Column({ type: 'varchar' })
  mail: string;

  @Column({ type: 'varchar' })
  uid: string;
}
