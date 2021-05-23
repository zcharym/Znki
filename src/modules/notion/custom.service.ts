import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { NotionService } from './notion.service';
import { CardService } from '../card/service/card.service';
import { Logger } from 'nestjs-pino';
import { from, of, pipe } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Injectable()
export class CustomService {
  constructor(
    private notionService: NotionService,
    private cardService: CardService,
    private logger: Logger,
  ) {}

  public async updateNotionItems(isReversed: boolean) {
    try {
      // query items in notion database
      const notionItems = (await this.notionService.queryDb()).results.filter(
        // FIXME type annotation:rich_text is missing in notion sdk
        // if id exists then it is in znki db
        (item: any) => item.properties.id.rich_text.length > 0,
      );
      // query items in znki database
      const znkiItems = (
        await this.cardService.list({
          where: {
            deckId: 7,
          },
          skip: 0,
          take: 100,
        })
      ).data;
      // find ids not in notion database
      // bulk create item
    } catch (error) {}
  }

  /**
   *
   * sync database info to notion database
   * @version 0.1
   *
   */
  public async syncDatabaseInfo() {
    try {
      // AMEND
      const cards = await this.cardService.list({
        where: {
          deckId: 7,
        },
        take: 150,
        skip: 0,
      });

      from(cards.data)
        .pipe(concatMap(val => of(val).pipe(delay(400))))
        .subscribe(item => {
          this.notionService.createSimplePage({
            title: item.title,
            content: item?.notes[0]?.content,
          });
        });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
