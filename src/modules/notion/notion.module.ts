import { Module } from '@nestjs/common';
import { NotionService } from './notion.service';
import { NotionController } from './notion.controller';
import { ConfigModule } from '@nestjs/config';
import { CustomService } from './custom.service';

@Module({
  imports: [ConfigModule],
  controllers: [NotionController],
  providers: [NotionService, CustomService],
})
export class NotionModule {}
