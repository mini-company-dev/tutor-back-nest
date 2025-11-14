import { Controller, Get, Param, Query } from '@nestjs/common';

import { GrammarTestService } from './grammar-test.service';
import { ApiResponse } from '../common/api-response';
import { LEVEL } from './dto/level.enum';
import { TEST_TYPE } from './dto/test-type.enum';

@Controller('api/tests')
export class GrammarTestController {
  constructor(private readonly grammarTestService: GrammarTestService) {}

  @Get(':id')
  async getTest(@Param('id') id: string) {
    const response = await this.grammarTestService.findOne(id);
    return ApiResponse.success(response);
  }

  // GET /api/tests?level=A1&type=Grammar
  @Get()
  async getTestsByLevel(
    @Query('level') level: LEVEL,
    @Query('type') type: TEST_TYPE,
  ) {
    console.log('test');
    const responses = await this.grammarTestService.getByLevel(level, type);
    return ApiResponse.success(responses);
  }
}
