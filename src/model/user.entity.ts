import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar', unique: true })
  uid: string;

  @Column({ type: 'varchar' })
  @Exclude()
  pwd: string;

  // @OneToMany(() => Group, group => group.user)
  // groups: Group[];
}
