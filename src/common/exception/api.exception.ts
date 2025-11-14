import { RESPONSE_CODE } from './code.exception.enum';
import { CustomError } from './custom.error';

/**
 * 100 : 요청 실패 (네트워크, rate limit 등)
 */
export class RequestFailedException extends CustomError {
  constructor(code: RESPONSE_CODE = RESPONSE_CODE.REQUEST_FAILED) {
    super('요청 처리 중 오류가 발생했습니다.', code);
  }
}

/**
 * 102 : 응답 파싱 실패 (JSON 파싱 오류)
 */
export class ParseException extends CustomError {
  constructor(code: RESPONSE_CODE = RESPONSE_CODE.PARSE_FAILED) {
    super('응답 데이터를 파싱할 수 없습니다.', code);
  }
}

/**
 * 101 : 응답 시간 초과 (Timeout)
 */
export class TimeoutException extends CustomError {
  constructor(code: RESPONSE_CODE = RESPONSE_CODE.TIMEOUT) {
    super('응답 시간이 초과되었습니다.', code);
  }
}
