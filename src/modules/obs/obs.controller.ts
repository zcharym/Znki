import { Controller } from '@nestjs/common';
import { ObsService } from './obs.service';

@Controller('obs')
export class ObsController {
  constructor(private readonly obsService: ObsService) {}
}
