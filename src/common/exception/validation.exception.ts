import { CustomError } from './custom.error';
import { RESPONSE_CODE } from './code.exception.enum';

/**
 * 400 : 입력 값 검증 실패
 * - 여러 validation error를 담을 수 있음
 */
export class ValidationException extends CustomError {
  constructor(code: RESPONSE_CODE = RESPONSE_CODE.VALIDATION_ERROR) {
    super('입력 값 검증에 실패했습니다.', code);
  }
}

/**
 * 401 : 필수 필드 누락
 * - 누락된 필드명만 저장하면 됨
 */
export class MissingFieldException extends CustomError {
  constructor(
    public field: string,
    code: RESPONSE_CODE = RESPONSE_CODE.MISSING_FIELD,
  ) {
    super(`필수 필드가 누락되었습니다: ${field}`, code);
  }
}
