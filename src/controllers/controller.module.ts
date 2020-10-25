import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/services/service.module';
import { RecordController } from './record/record.controller';

@Module({
  imports: [ServiceModule],
  controllers: [RecordController],
  providers: [],
})
export class ControllerModule {}
