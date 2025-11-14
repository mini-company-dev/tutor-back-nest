export class ApiResponse<T> {
  constructor(
    public code: number,
    public message: string | null,
    public data: T | null,
  ) {}

  static success<T>(data: T): ApiResponse<T> {
    return new ApiResponse(200, null, data);
  }

  static ok(): ApiResponse<null> {
    return new ApiResponse(200, null, null);
  }

  static error(code: number, message: string): ApiResponse<null> {
    return new ApiResponse(code, message, null);
  }
}
