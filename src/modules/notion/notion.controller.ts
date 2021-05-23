import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { isString, isUUID, length } from 'class-validator';
import { CustomService } from './custom.service';
import { NotionService } from './notion.service';

@ApiTags('Notion')
@Controller('notion')
export class NotionController {
  constructor(
    private readonly customService: CustomService,
    private readonly notionService: NotionService,
  ) {}

  @Get()
  @ApiOperation({ description: '[notion] get item info by uuid' })
  getEntityInfo(
    @Query('id') id: string,
    @Query('type') type: 'page' | 'database',
  ) {
    if (length(id, 32)) {
      if (type === 'page') {
        return this.notionService.getPageInfo(id);
      } else {
        return this.notionService.getDatabaseInfo(id);
      }
    } else {
      return 'page id is not correct';
    }
  }

  @Get('database')
  @ApiOperation({ description: '[notion] get database info by uuid' })
  getDatabaseInfo() {
    this.customService.syncDatabaseInfo();
    return this.notionService.queryDb();
  }
}
