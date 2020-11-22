import { Record } from '../../model';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordsResponseDto } from './dto/records-response.dto';

@Crud({
  model: {
    type: Record,
  },
  dto: {
    create: CreateRecordDto,
  },
  query: {
    exclude: ['groupId'],
    join: {
      group: {
        exclude: ['id', 'createAt', 'updateAt'], // FIXME exclude not working
        eager: true,
      },
      tags: {
        eager: true,
      },
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
    getMany: RecordsResponseDto,
  },
})
@ApiTags('Record')
@Controller('record')
export class RecordController {
  constructor(private service: RecordService) {
  }
}
