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
      include: { answers: true },
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

    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }

    return data.map((item) => GrammarTestResponse.from(item));
  }
}
