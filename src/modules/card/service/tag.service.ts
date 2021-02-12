import { Injectable } from '@nestjs/common';
import { DbService } from 'src/shared/db/db.service';
import { CreateTagDto } from '../dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(private db: DbService) {}

  async addTag(tag: CreateTagDto) {
    await this.db.tag.create({ data: tag });
  }
}
