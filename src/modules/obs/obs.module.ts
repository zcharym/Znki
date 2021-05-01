import { HttpModule, Module } from '@nestjs/common';
import { ObsService } from './obs.service';

@Module({
  imports: [HttpModule],
  providers: [ObsService],
  exports: [ObsService],
})
export class ObsModule {}
