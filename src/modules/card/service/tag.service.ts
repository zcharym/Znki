import { Injectable, UseGuards } from '@nestjs/common';
import { DbService } from 'src/shared/db/db.service';
import { CreateTagDto } from '../dto/create-tag.dto';
import { toTree } from '../../../shared/utils/common.utils';
import { JWTGuard } from 'src/modules/auth/jwt.guard';
@Injectable()
@UseGuards(JWTGuard)
export class TagService {
  constructor(private db: DbService) {}

  async addTag(item: CreateTagDto) {
    await this.db.tag.create({
      data: {
        ...item.tag,
        cards: {
          connect: {
            id: item.cardId,
          },
        },
      },
    });
  }

  async list() {
    const tags = await this.db.tag.findMany();
    return toTree(tags);
  }

  async deleteTag(id: number) {
    return this.db.tag.delete({ where: { id } });
  }
}
