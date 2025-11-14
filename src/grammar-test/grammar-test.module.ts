import { Module } from '@nestjs/common';
import { GrammarTestService } from './grammar-test.service';
import { GrammarTestController } from './grammar-test.controller';

@Module({
  controllers: [GrammarTestController],
  providers: [GrammarTestService],
})
export class GrammarTestModule {}
