export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly context?: string;

  constructor(message: string, statusCode: number, context?: string) {
    super(message);
    this.statusCode = statusCode;
    this.context = context;
  }
}

export class NotFoundError extends Error {}

export class ConflictDataError extends Error {}

export class UnauthorizedError extends Error {}
