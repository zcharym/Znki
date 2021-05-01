import { Test, TestingModule } from '@nestjs/testing';
import { ObsService } from './obs.service';

describe('ObsService', () => {
  let service: ObsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObsService],
    }).compile();

    service = module.get<ObsService>(ObsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
