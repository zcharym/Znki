import { Tag } from './../../model/tag.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) tagRepo: Repository<Tag>) {}

  public async getTagsByRecordId(recordId: string) {}
}
