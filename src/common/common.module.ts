import { HttpModule, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { UploadService } from './upload/upload.service';

@Module({
  imports: [HttpModule],
  controllers: [CommonController],
  providers: [CommonService, UploadService],
})
export class CommonModule {}
