import { Controller, Get } from '@nestjs/common';
import { RecordBaseService } from 'src/services/record';

@Controller('record')
export class RecordController {
  constructor(private recordService: RecordBaseService) {}

  @Get()
  getRecords() {
    return this.recordService.getRecords();
  }
}
