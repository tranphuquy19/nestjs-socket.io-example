import { Module } from '@nestjs/common';
import { NdGateway } from './nd.gateway';

@Module({
  providers: [NdGateway]
})
export class SecondModule {}
