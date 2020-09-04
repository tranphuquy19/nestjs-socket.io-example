import { Test, TestingModule } from '@nestjs/testing';
import { NdGateway } from './nd.gateway';

describe('NdGateway', () => {
  let gateway: NdGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NdGateway],
    }).compile();

    gateway = module.get<NdGateway>(NdGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
