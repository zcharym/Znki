import { HttpModule, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { UploadService } from './upload/upload.service';
import { ObsModule } from 'src/modules/obs/obs.module';

@Module({
  imports: [HttpModule, ObsModule],
  controllers: [CommonController],
  providers: [CommonService, UploadService],
})
export class CommonModule {}
