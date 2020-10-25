import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from 'src/model';
import { Repository } from 'typeorm';

@Injectable()
export class RecordBaseService {
  constructor(
    @InjectRepository(Record) readonly recordRepo: Repository<Record>,
  ) {}

  public async getRecords() {
    return await this.recordRepo.find();
  }
}
