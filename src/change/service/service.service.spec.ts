import { Test, TestingModule } from '@nestjs/testing';
import { ChangeService } from './service.service';

describe('ServiceService', () => {
  let service: ChangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChangeService],
    }).compile();

    service = module.get<ChangeService>(ChangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
