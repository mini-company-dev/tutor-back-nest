import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrammarTestModule } from './grammar-test/grammar-test.module';
import { PrismaModule } from './prisma/prisma.module';
import { AiTestModule } from './ai-test/ai-test.module';

@Module({
  imports: [GrammarTestModule, PrismaModule, AiTestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
