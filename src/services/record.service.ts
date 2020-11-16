import { Record } from './../model/record.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class RecordService extends TypeOrmCrudService<Record> {
  constructor(@InjectRepository(Record) repo) {
    super(repo);
  }
}
