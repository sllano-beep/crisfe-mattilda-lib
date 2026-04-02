import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomExceptionMessage {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly status: HttpStatus,
  ) {}
}

export class MatildaApiException extends HttpException {
  public readonly code: string;
  public readonly customMessage: string;

  constructor(exceptionMessage: CustomExceptionMessage) {
    super(
      {
        code: exceptionMessage.code,
        message: exceptionMessage.message,
      },
      exceptionMessage.status,
    );

    this.code = exceptionMessage.code;
    this.customMessage = exceptionMessage.message;
  }
}
