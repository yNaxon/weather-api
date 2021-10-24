export class AccuweatherError extends Error {
  readonly statusCode: number;
  readonly error: Error;

  constructor( statusCode: number, message: string, error?: Error) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
} 