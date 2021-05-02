import { HttpModule, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { UploadService } from './upload/upload.service';
import { ObsModule } from 'src/modules/obs/obs.module';
import { DbModule } from '../shared/db/db.module';

@Module({
  imports: [HttpModule, ObsModule, DbModule],
  controllers: [CommonController],
  providers: [CommonService, UploadService],
})
export class CommonModule {}
