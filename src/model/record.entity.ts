import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Group } from './group.entity';
import { Tag } from './tag.entity';
import { Type } from 'class-transformer';
import { IsNumber, IsString, MinLength } from 'class-validator';

@Entity()
export class Record extends BaseEntity {
  @Column({ type: 'varchar' })
  @IsString()
  @MinLength(1)
  zKey: string;

  @Column({ type: 'varchar' })
  @IsString()
  @MinLength(1)
  zValue: string;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  priority: number;

  @Column({ type: 'int', name: 'group_id' })
  groupId: number;

  @ManyToOne(() => Group, (c) => c.records)
  @JoinColumn({ name: 'group_id' })
  group?: Group;

  @Column({ type: 'boolean', default: false })
  isRemembered: boolean;

  @OneToMany(() => Tag, (c) => c.record)
  @Type(() => Tag)
  tags: Tag[];
}
