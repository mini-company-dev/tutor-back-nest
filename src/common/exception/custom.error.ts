import { RESPONSE_CODE } from './code.exception.enum';

export class CustomError extends Error {
  constructor(message: string, code: RESPONSE_CODE) {
    super(message);
    this.code = code;
  }

  code: RESPONSE_CODE;
}
