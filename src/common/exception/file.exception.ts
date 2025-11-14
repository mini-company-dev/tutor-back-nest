import { CustomError } from './custom.error';
import { RESPONSE_CODE } from './code.exception.enum';

/**
 * 200 : 파일 없음
 * 메시지 변경 가능성이 낮음 → 오버로드 필요 없음
 */
export class FileNotFoundException extends CustomError {
  constructor(code: RESPONSE_CODE = RESPONSE_CODE.FILE_NOT_FOUND) {
    super('업로드된 파일이 존재하지 않습니다.', code);
  }
}

/**
 * 201 : 지원하지 않는 파일 형식
 * mimetype 정보가 필요함 → 필드만 추가
 */
export class UnsupportedMediaTypeException extends CustomError {
  constructor(
    public mimetype: string,
    code: RESPONSE_CODE = RESPONSE_CODE.UNSUPPORTED_MEDIA_TYPE,
  ) {
    super(`지원하지 않는 파일 형식입니다: ${mimetype}`, code);
  }
}

/**
 * 202 : 파일 크기 초과
 * size 정보가 필요함 → 필드만 추가
 */
export class FileTooLargeException extends CustomError {
  constructor(code: RESPONSE_CODE = RESPONSE_CODE.FILE_TOO_LARGE) {
    super('파일 크기가 허용 범위를 초과했습니다.', code);
  }
}

/**
 * 203 : 유효하지 않은 오디오 형식
 * detail 정보가 필요할 수 있음 → 필드만 추가
 */
export class InvalidAudioFormatException extends CustomError {
  constructor(code: RESPONSE_CODE = RESPONSE_CODE.INVALID_AUDIO_FORMAT) {
    super('유효하지 않은 오디오 형식입니다.', code);
  }
}
