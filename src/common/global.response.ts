export class CustomResponse<T> {
  constructor(
    public message: string | null,
    public code: number,
    public data: T | null,
  ) {}

  static success<T>(data: T): CustomResponse<T> {
    return new CustomResponse(null, 0, data);
  }

  static ok(): CustomResponse<null> {
    return new CustomResponse(null, 0, null);
  }

  static error(message: string, code: number): CustomResponse<null> {
    return new CustomResponse(message, code, null);
  }
}
