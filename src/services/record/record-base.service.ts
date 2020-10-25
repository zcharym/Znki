import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecordDto } from 'src/controllers/record/dto/create-record.dto';
import { Record } from 'src/model';
import { Repository } from 'typeorm';
import { resourceLimits } from 'worker_threads';

@Injectable()
export class RecordBaseService {
  constructor(
    @InjectRepository(Record) readonly recordRepo: Repository<Record>,
  ) {}

  public async getRecords() {
    const [result, count] = await this.recordRepo.findAndCount();
    return {
      data: result,
      total: count,
    };
  }

  public async saveRecord(createRecord: CreateRecordDto) {
    const { zKey, zValue } = createRecord;
    try {
      await this.recordRepo.save({
        zKey,
        zValue,
      });
    } catch (e) {
      Logger.error(e, RecordBaseService.name, 'record creating error');
    }
  }
}
