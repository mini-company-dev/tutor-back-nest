import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GrammarTestResponse } from './dto/grammar-test.response';

@Injectable()
export class GrammarTestService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.grammarTest.findMany();
  }

  findOne(id: string) {
    return this.prisma.grammarTest.findUnique({
      where: { id },
    });
  }

  async getByLevel(
    level: string,
    type: string,
  ): Promise<GrammarTestResponse[]> {
    const data = await this.prisma.grammarTest.findMany({
      where: {
        level,
        type,
      },
      include: { answers: true },
    });
    return data.map((item) => GrammarTestResponse.from(item));
  }
}
