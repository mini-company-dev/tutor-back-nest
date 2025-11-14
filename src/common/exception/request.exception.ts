import { CustomError } from './custom.error';
import { RESPONSE_CODE } from './code.exception.enum';

/**
 * 403 : 잘못된 요청 (사용자 입력 문제)
 * detail 포함 가능 → 단일 constructor
 */
export class BadRequestException extends CustomError {
  constructor(code: RESPONSE_CODE = RESPONSE_CODE.BAD_REQUEST) {
    super('잘못된 요청입니다.', code);
  }
}

/**
 * 502 : 일반 처리 실패 (서버 내부 문제)
 * detail 포함 가능 → 단일 constructor
 */
export class OperationFailedException extends CustomError {
  constructor(code: RESPONSE_CODE = RESPONSE_CODE.INTERNAL_PROCESSING_ERROR) {
    super('작업을 수행할 수 없습니다.', code);
  }
}
