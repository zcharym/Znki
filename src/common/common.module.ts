import { HttpModule, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { UploadService } from './upload/upload.service';
import { ObsModule } from 'src/modules/obs/obs.module';
import { DbModule } from '../shared/db/db.module';
import { SheetService } from './sheet/sheet.service';

@Module({
  imports: [HttpModule, ObsModule, DbModule],
  controllers: [CommonController],
  providers: [CommonService, UploadService, SheetService],
})
export class CommonModule {}
