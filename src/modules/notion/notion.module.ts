import { Module } from '@nestjs/common';
import { NotionService } from './notion.service';
import { NotionController } from './notion.controller';
import { ConfigModule } from '@nestjs/config';
import { CustomService } from './custom.service';
import { CardModule } from '../card/card.module';

@Module({
  imports: [ConfigModule, CardModule],
  controllers: [NotionController],
  providers: [NotionService, CustomService],
})
export class NotionModule {}
