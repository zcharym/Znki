import { RecordService } from './../services/record.service';
import { Record } from './../model/record.entity';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import {
  CreateManyDto,
  Crud,
  CrudController,
  CrudRequest,
  CrudService,
  GetManyDefaultResponse,
} from '@nestjsx/crud';

@Crud({
  model: {
    type: Record,
  },
})
@ApiTags('Record')
@Controller('record')
export class RecordController {
  constructor(private service: RecordService) {}
}
