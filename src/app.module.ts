import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrammarTestModule } from './grammar-test/grammar-test.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [GrammarTestModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
