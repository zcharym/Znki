import { Test, TestingModule } from '@nestjs/testing';
import { ObsController } from './obs.controller';
import { ObsService } from './obs.service';

describe('ObsController', () => {
  let controller: ObsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObsController],
      providers: [ObsService],
    }).compile();

    controller = module.get<ObsController>(ObsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
