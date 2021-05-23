import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';
import { Filter } from '@notionhq/client/build/src/api-types';
import { Logger } from 'nestjs-pino';

@Injectable()
export class NotionService implements OnModuleInit {
  private notion: Client;
  constructor(private configService: ConfigService, private logger: Logger) {
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

  // TODO abstract this method
  async createSimplePage({ title = 'api-insert', content = 'placeholder' }) {
    const body = {
      parent: {
        database_id: this.configService.get<string>('ZNKI_DATABASE_ID'),
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
      },
      children: [
        // {
        //   object: 'block',
        //   type: 'heading_2',
        //   heading_2: {
        //     text: [{ type: 'text', text: { content: 'Lacinato kale' } }],
        //   },
        // },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            text: [
              {
                type: 'text',
                text: {
                  content,
                },
              },
            ],
          },
        },
      ],
    };
    try {
      const result = await this.notion.request({
        path: `pages`,
        method: 'post',
        body,
      });
      return result;
    } catch (error) {
      this.logger.error(error);
    }
  }

  // TODO sync creating entity properties
  async createZnkiPage() {}

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
