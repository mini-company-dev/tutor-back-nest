import { Controller, Get, Param, Query } from '@nestjs/common';

import { GrammarTestService } from './grammar-test.service';
import { CustomResponse } from '../common/global.response';
import { LEVEL } from './dto/level.enum';
import { TEST_TYPE } from './dto/test-type.enum';
import { GrammarTestResponse } from './dto/grammar-test.response';

@Controller('api/tests')
export class GrammarTestController {
  constructor(private readonly grammarTestService: GrammarTestService) {}

  @Get(':id')
  async getTest(@Param('id') id: string) {
    const data = await this.grammarTestService.findOne(id);
    return CustomResponse.success(data);
  }

  @Get()
  async getTestsByLevel(
    @Query('level') level: LEVEL,
    @Query('type') type: TEST_TYPE,
  ): Promise<CustomResponse<GrammarTestResponse[]>> {
    const data: GrammarTestResponse[] =
      await this.grammarTestService.getByLevel(level, type);
    return CustomResponse.success(data);
  }
}
