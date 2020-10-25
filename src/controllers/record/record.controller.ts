import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RecordBaseService } from 'src/services/record';
import { CreateRecordDto } from './dto/create-record.dto';

@ApiTags('Record')
@Controller('record')
export class RecordController {
  constructor(private recordService: RecordBaseService) {}

  @Get()
  getRecords() {
    return this.recordService.getRecords();
  }

  @Post()
  @ApiCreatedResponse({
    type: CreateRecordDto,
    description: 'create record dto',
  })
  @HttpCode(HttpStatus.CREATED)
  public async saveRecord(@Body() body: CreateRecordDto) {
    await this.recordService.saveRecord(body);
  }
}
