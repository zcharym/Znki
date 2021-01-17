import { Column, Entity } from 'typeorm';

import { BaseModel } from './base.model';

@Entity('users', { schema: 'znki' })
export class User extends BaseModel {
  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar', select: false })
  pwd: string;

  @Column({ type: 'varchar', nullable: true, default: () => 'NULL' })
  avatar: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;
}
