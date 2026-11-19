export class HttpError extends Error {
  status: number;
  code?: string;
  data?: Record<string, unknown>;

  constructor(status: number, message: string, code?: string, data?: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.code = code;
    this.data = data;
  }
}
