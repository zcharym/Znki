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
export class RecordController implements CrudController<Record> {
  constructor(private recordService: RecordService) {}
  service: CrudService<Record>;
  getManyBase?(
    req: CrudRequest,
  ): Promise<GetManyDefaultResponse<Record> | Record[]> {
    throw new Error('Method not implemented.');
  }
  getOneBase?(req: CrudRequest): Promise<Record> {
    throw new Error('Method not implemented.');
  }
  createOneBase?(req: CrudRequest, dto: Record): Promise<Record> {
    throw new Error('Method not implemented.');
  }
  createManyBase?(
    req: CrudRequest,
    dto: CreateManyDto<Record>,
  ): Promise<Record[]> {
    throw new Error('Method not implemented.');
  }
  updateOneBase?(req: CrudRequest, dto: Record): Promise<Record> {
    throw new Error('Method not implemented.');
  }
  replaceOneBase?(req: CrudRequest, dto: Record): Promise<Record> {
    throw new Error('Method not implemented.');
  }
  deleteOneBase?(req: CrudRequest): Promise<void | Record> {
    throw new Error('Method not implemented.');
  }
}
