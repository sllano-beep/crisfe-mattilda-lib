import { HttpStatus } from '@nestjs/common';
import { MatildaApiException } from '../../../src/matilda/utils/matilda.exception';
import {
  getMatildaErrorMessage,
  isMatildaErrorResponse,
  mapMatildaAxiosError,
} from '../../../src/matilda/utils/matilda.utils';

describe('isMatildaErrorResponse', () => {
  it('Given an object with mensaje string, When called, Then returns true', () => {
    expect(isMatildaErrorResponse({ mensaje: 'error' })).toBe(true);
  });

  it('Given an object with errors array of strings, When called, Then returns true', () => {
    expect(isMatildaErrorResponse({ errors: ['err1', 'err2'] })).toBe(true);
  });

  it('Given an object with errors array of non-strings, When called, Then returns false', () => {
    expect(isMatildaErrorResponse({ errors: [123, 456] })).toBe(false);
  });

  it('Given null, When called, Then returns false', () => {
    expect(isMatildaErrorResponse(null)).toBe(false);
  });

  it('Given a non-object, When called, Then returns false', () => {
    expect(isMatildaErrorResponse('string')).toBe(false);
    expect(isMatildaErrorResponse(123)).toBe(false);
  });

  it('Given an object with no mensaje or errors, When called, Then returns false', () => {
    expect(isMatildaErrorResponse({})).toBe(false);
  });
});

describe('getMatildaErrorMessage', () => {
  it('Given error with mensaje, When called, Then returns mensaje', () => {
    expect(getMatildaErrorMessage({ mensaje: 'fail', errors: [] })).toBe(
      'fail',
    );
  });

  it('Given error with errors array, When called, Then returns first error', () => {
    expect(getMatildaErrorMessage({ errors: ['err1', 'err2'] })).toBe('err1');
  });

  it('Given error with empty errors array, When called, Then returns default message', () => {
    expect(getMatildaErrorMessage({ errors: [] })).toBe(
      'An unknown error occurred',
    );
  });

  it('Given error with no mensaje or errors, When called, Then returns default message', () => {
    expect(getMatildaErrorMessage({} as any)).toBe('An unknown error occurred');
  });
});

describe('mapMatildaAxiosError', () => {
  it('Given an AxiosError with Matilda error response, When called, Then throws MatildaApiException with correct data', () => {
    const error = {
      response: {
        status: 400,
        data: { id: 123, mensaje: 'fail', errors: [] },
      },
    };
    try {
      mapMatildaAxiosError(error);
      fail('Should throw');
    } catch (e) {
      expect(e).toBeInstanceOf(MatildaApiException);
      expect(e.code).toBe('123');
      expect(e.customMessage).toBe('fail');
      expect(e.getStatus()).toBe(400);
    }
  });

  it('Given an AxiosError with Matilda error response with errors array, When called, Then throws MatildaApiException with first error', () => {
    const error = {
      response: {
        status: 502,
        data: { errors: ['err1', 'err2'] },
      },
    };
    try {
      mapMatildaAxiosError(error);
      fail('Should throw');
    } catch (e) {
      expect(e).toBeInstanceOf(MatildaApiException);
      expect(e.code).toBe('MATILDA_API_ERROR');
      expect(e.customMessage).toBe('err1');
      expect(e.getStatus()).toBe(502);
    }
  });


  it('Given an AxiosError with no Matilda error response, When called, Then rethrows original error', () => {
    const error = {
      response: {
        status: 500,
        data: { foo: 'bar' },
      },
    };
    expect(() => mapMatildaAxiosError(error)).toThrow();
  });

  it('Given an error with no response, When called, Then rethrows original error', () => {
    const error = { message: 'plain error' };
    expect(() => mapMatildaAxiosError(error)).toThrow();
  });

  it('Given an AxiosError with undefined status, When called, Then uses BAD_GATEWAY as default', () => {
    const error = {
      response: {
        data: { mensaje: 'fail' },
      },
    };
    try {
      mapMatildaAxiosError(error);
      fail('Should throw');
    } catch (e) {
      expect(e).toBeInstanceOf(MatildaApiException);
      expect(e.getStatus()).toBe(HttpStatus.BAD_GATEWAY);
    }
  });
});
