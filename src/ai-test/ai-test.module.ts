import { Module } from '@nestjs/common';
import { AiTestService } from './ai-test.service';
import { AiTestController } from './ai-test.controller';

@Module({
  controllers: [AiTestController],
  providers: [AiTestService],
})
export class AiTestModule {}
