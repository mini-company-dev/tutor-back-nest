import { RESPONSE_CODE } from './code.exception.enum';
import { CustomError } from './custom.error';

/**
 * 401 Unauthorized
 * 인증 정보 없음 or 로그인 필요
 */
export class UnauthorizedAccessException extends CustomError {
  // 오버로드 시그니처
  constructor(code: RESPONSE_CODE);
  constructor(message: string, code: RESPONSE_CODE);

  // 실제 구현
  constructor(messageOrCode: string | RESPONSE_CODE, code?: RESPONSE_CODE) {
    if (typeof messageOrCode === 'string') {
      // 커스텀 메시지 + 코드
      super(messageOrCode, code!);
    } else {
      // 기본 메시지 + 코드
      super('로그인이 필요합니다.', messageOrCode);
    }
  }
}

/**
 * 403 Forbidden
 * 권한 없음
 */
export class ForbiddenAccessException extends CustomError {
  // 오버로드 시그니처
  constructor(code: RESPONSE_CODE);
  constructor(message: string, code: RESPONSE_CODE);

  // 실제 구현
  constructor(messageOrCode: string | RESPONSE_CODE, code?: RESPONSE_CODE) {
    if (typeof messageOrCode === 'string') {
      super(messageOrCode, code!);
    } else {
      super('접근 권한이 없습니다.', messageOrCode);
    }
  }
}

/**
 * 302 Token expired
 * 토큰 만료
 */
export class TokenExpiredException extends CustomError {
  constructor(code: RESPONSE_CODE = RESPONSE_CODE.TOKEN_EXPIRED) {
    super('토큰이 만료되었습니다.', code);
  }
}

/**
 * 303 Invalid token
 * 토큰 무효
 */
export class InvalidTokenException extends CustomError {
  constructor(code: RESPONSE_CODE = RESPONSE_CODE.INVALID_TOKEN) {
    super('유효하지 않은 토큰입니다.', code);
  }
}
