import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Record } from '../../model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecordService extends TypeOrmCrudService<Record> {
  constructor(@InjectRepository(Record) repo) {
    super(repo);
  }
}
