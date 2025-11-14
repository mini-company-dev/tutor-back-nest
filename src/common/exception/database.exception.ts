import { CustomError } from './custom.error';
import { RESPONSE_CODE } from './code.exception.enum';

/**
 * 500 : 데이터베이스 처리 오류
 * detail 필요 → 생성자에서 받도록 개선
 */
export class DatabaseException extends CustomError {
  constructor(code: RESPONSE_CODE = RESPONSE_CODE.DATABASE_ERROR) {
    super('데이터베이스 처리 중 오류가 발생했습니다.', code);
  }
}

/**
 * 501 : 리소스 없음
 * resource 필드 필요 → 유지
 */
export class ResourceNotFoundException extends CustomError {
  constructor(
    public resource: string,
    code: RESPONSE_CODE = RESPONSE_CODE.RESOURCE_NOT_FOUND,
  ) {
    super(`해당 리소스를 찾을 수 없습니다: ${resource}`, code);
  }
}

/**
 * 502 : 내부 처리 오류
 * detail 필요 → 생성자 인자로 받도록 개선
 */
export class InternalProcessingException extends CustomError {
  constructor(code: RESPONSE_CODE = RESPONSE_CODE.INTERNAL_PROCESSING_ERROR) {
    super('요청 처리 중 내부 오류가 발생했습니다.', code);
  }
}
