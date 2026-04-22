import { HttpStatus } from '@nestjs/common';
import {
  CustomExceptionMessage,
  MattildaApiException,
} from '../../../src/mattilda/utils/mattilda.exception';

describe('CustomExceptionMessage', () => {
  it('Given valid params, When constructed, Then it should set all properties', () => {
    const code = 'ERR001';
    const message = 'Something went wrong';
    const status = HttpStatus.BAD_REQUEST;
    const exception = new CustomExceptionMessage(code, message, status);
    expect(exception.code).toBe(code);
    expect(exception.message).toBe(message);
    expect(exception.status).toBe(status);
  });
});

describe('MattildaApiException', () => {
  it('Given a valid CustomExceptionMessage, When constructed, Then it should set code, customMessage and call super with correct args', () => {
    const exceptionMessage = new CustomExceptionMessage(
      'ERR002',
      'API error',
      HttpStatus.NOT_FOUND,
    );
    const exception = new MattildaApiException(exceptionMessage);
    expect(exception.code).toBe('ERR002');
    expect(exception.customMessage).toBe('API error');
    expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
    expect(exception.getResponse()).toEqual({
      code: 'ERR002',
      message: 'API error',
    });
  });

  it('Given a CustomExceptionMessage with empty code and message, When constructed, Then it should set properties accordingly', () => {
    const exceptionMessage = new CustomExceptionMessage(
      '',
      '',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    const exception = new MattildaApiException(exceptionMessage);
    expect(exception.code).toBe('');
    expect(exception.customMessage).toBe('');
    expect(exception.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(exception.getResponse()).toEqual({ code: '', message: '' });
  });
});
