import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Type } from 'class-transformer';
import { Record } from './record.entity';

@Entity()
export class Group extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => Record, (u) => u.group)
  @Type(() => Record)
  records: Record[];

  // @ManyToOne(() => User, user => user.groups,{nullable:false,eager:true})
  // @JoinColumn({ name: "usre", referencedColumnName: "id" })
  // user: User;
}
