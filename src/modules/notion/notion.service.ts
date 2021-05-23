import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';
import { Filter } from '@notionhq/client/build/src/api-types';
import { IZnkiItem } from './notion.interface';

@Injectable()
export class NotionService implements OnModuleInit {
  private notion: Client;
  private readonly logger = new Logger(NotionService.name);

  constructor(private configService: ConfigService) {
    this.notion = new Client({
      auth: this.configService.get<string>('NOTION_WORKSPACE_TOKEN'),
    });
  }

  /**
   * getPageInfo by pageId
   * @param pageId uuid
   */
  async getPageInfo(pageId: string) {
    const page = await this.notion.pages.retrieve({
      page_id: pageId,
    });
    return page;
  }

  /**
   *
   * @param databaseId uuid
   */
  async getDatabaseInfo(databaseId: string) {
    console.log(databaseId);

    const database = await this.notion.databases.retrieve({
      database_id: databaseId,
    });
    return database;
  }

  async queryDb() {
    // FIXME https://github.com/makenotion/notion-sdk-js/issues/77
    const filters: Filter = {};

    const database = await this.notion.databases.query({
      database_id: this.configService.get<string>('ZNKI_DATABASE_ID'),
      page_size: 100, // maximum 100
      // filter:filters,
      sorts: [
        {
          property: 'title',
          direction: 'ascending',
        },
      ],
    });

    return database;
  }

  async updatePageInfo(blockId: string) {}

  async onModuleInit() {
    const log = await this.notion.users.list({});
    if (log) {
      this.logger.log(`Notion SDK initiated successfully.`);
    } else {
      this.logger.error(`Notion auth error. (might be network error)`);
    }
  }
}
