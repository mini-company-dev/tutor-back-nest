export enum RESPONSE_CODE {
  // ---------------------------------------
  // 1xx : API Domain (외부 요청 처리 관련 문제)
  // ---------------------------------------
  REQUEST_FAILED = 100, // API 요청 실패 (네트워크/서버 문제)
  TIMEOUT = 101, // 응답 시간 초과
  PARSE_FAILED = 102, // 응답(JSON 등) 파싱 실패

  // ---------------------------------------
  // 2xx : File / Media Domain (파일/음성 관련 문제)
  // ---------------------------------------
  FILE_NOT_FOUND = 200, // 파일이 요청에 포함되지 않음
  UNSUPPORTED_MEDIA_TYPE = 201, // 지원하지 않는 파일 형식
  FILE_TOO_LARGE = 202, // 파일 크기 제한 초과
  INVALID_AUDIO_FORMAT = 203, // 음성 파일 형식 오류

  // ---------------------------------------
  // 3xx : Auth / Security Domain (인증/권한 문제 — 사용자 잘못)
  // ---------------------------------------
  UNAUTHORIZED = 300, // 인증 정보 없음 (로그인 필요)
  FORBIDDEN = 301, // 권한 없음
  TOKEN_EXPIRED = 302, // 토큰 만료
  INVALID_TOKEN = 303, // 토큰이 유효하지 않음

  // ---------------------------------------
  // 4xx : User Input / Validation Errors (사용자 입력 문제)
  // ---------------------------------------
  VALIDATION_ERROR = 400, // 입력 형식/값 검증 실패
  MISSING_FIELD = 401, // 필수 입력값 누락
  INVALID_PARAMETER = 402, // 파라미터 값 또는 타입 오류
  BAD_REQUEST = 403, // 잘못된 요청 전체 (문법, 구조 등)

  // ---------------------------------------
  // 5xx : Database / Internal Processing (서버 내부 문제)
  // ---------------------------------------
  DATABASE_ERROR = 500, // DB 쿼리/트랜잭션 문제
  RESOURCE_NOT_FOUND = 501, // DB 리소스 없음
  INTERNAL_PROCESSING_ERROR = 502, // 내부 처리 오류

  // ---------------------------------------
  // 9xx : System / Unknown Error (예상 불가 오류)
  // ---------------------------------------
  UNKNOWN = 900, // 알 수 없는 시스템 오류
}
