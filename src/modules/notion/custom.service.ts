import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { NotionService } from './notion.service';

@Injectable()
export class CustomService {
  constructor(private notionService: NotionService) {}
  public async syncDatabase() {
    try {
      // query items in notion database
      // query items in znki database
      // find ids not in notion database
      // bulk create item
    } catch (error) {}
  }
}
