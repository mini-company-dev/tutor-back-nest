import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { AiTestService } from './ai-test.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { History } from './dto/history.request';
import { CustomResponse } from 'src/common/global.response';

@Controller('/api/aiTest')
export class AiTestController {
  constructor(private readonly aiTestService: AiTestService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async evaluate(
    @UploadedFile() file: Express.Multer.File,
    @Body('history') historyJson: string,
  ): Promise<CustomResponse<any>> {
    if (!file) {
      throw new BadRequestException('음성 파일이 필요합니다.');
    }

    const history: History[] = historyJson
      ? (JSON.parse(historyJson) as History[])
      : [];

    const data = await this.aiTestService.evaluate(file, history);
    return CustomResponse.success(data);
  }
}
