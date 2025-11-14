import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomError } from './custom.error';
import { RESPONSE_CODE } from './code.exception.enum';
import { CustomResponse } from '../global.response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const httpStatus = 200;

    let message = '서버 오류가 발생했습니다.';
    let code: RESPONSE_CODE = RESPONSE_CODE.UNKNOWN;

    // --------------------------
    // CustomError (우리가 만든 모든 예외)
    // --------------------------
    if (exception instanceof CustomError) {
      message = exception.message;
      code = exception.code;

      // 🔥 서버 로그만 출력
      console.error('[CustomError]', message, exception);

      res.status(httpStatus).json(CustomResponse.error(message, code));
      return;
    }

    // --------------------------
    // Nest HttpException
    // --------------------------
    if (exception instanceof HttpException) {
      const resp = exception.getResponse();

      if (typeof resp === 'string') {
        message = resp;
      } else {
        const body = resp as Record<string, unknown>;
        message = (body.message as string) ?? message;
      }

      console.error('[HttpException]', message, exception);

      res.status(httpStatus).json(CustomResponse.error(message, code));
      return;
    }

    // --------------------------
    // 일반 JS Error
    // --------------------------
    if (exception instanceof Error) {
      message = exception.message;

      console.error('[Error]', message, exception.stack);

      res.status(httpStatus).json(CustomResponse.error(message, code));
      return;
    }

    // --------------------------
    // 알 수 없는 예외
    // --------------------------
    console.error('[UnknownException]', exception);

    res.status(httpStatus).json(CustomResponse.error(message, code));
  }
}
