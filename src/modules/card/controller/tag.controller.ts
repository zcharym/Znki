import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { TagService } from '../service/tag.service';
import { Tag } from '../../../models/tag.model';
import { TagResDto } from '../dto/tag-res.dto';
import { CreateTagDto } from '../dto/create-tag.dto';

@Crud({
  model: {
    type: Tag,
  },
  dto: {
    create: CreateTagDto,
  },
  query: {
    join: {
      // group: {
      //   exclude: ['id', 'createAt', 'updateAt'], // FIXME exclude not working
      //   eager: true,
      // },
      // tags: {
      //   eager: true,
      // },
    },
    alwaysPaginate: true,
  },
  routes: {
    only: [
      'createOneBase',
      'replaceOneBase',
      'deleteOneBase',
      'getOneBase',
      'getManyBase',
    ],
    deleteOneBase: {
      returnDeleted: false,
    },
  },
  serialize: {
    getMany: TagResDto,
  },
})
@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private service: TagService) {}
}
