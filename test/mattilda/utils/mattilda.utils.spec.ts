import { HttpStatus } from '@nestjs/common';
import { MattildaApiException } from '../../../src/mattilda/utils/mattilda.exception';
import {
  getMattildaErrorMessage,
  isMattildaErrorResponse,
  mapMattildaAxiosError,
} from '../../../src/mattilda/utils/mattilda.utils';

describe('isMattildaErrorResponse', () => {
  it('Given an object with mensaje string, When called, Then returns true', () => {
    expect(isMattildaErrorResponse({ mensaje: 'error' })).toBe(true);
  });

  it('Given an object with errors array of strings, When called, Then returns true', () => {
    expect(isMattildaErrorResponse({ errors: ['err1', 'err2'] })).toBe(true);
  });

  it('Given an object with errors array of non-strings, When called, Then returns false', () => {
    expect(isMattildaErrorResponse({ errors: [123, 456] })).toBe(false);
  });

  it('Given null, When called, Then returns false', () => {
    expect(isMattildaErrorResponse(null)).toBe(false);
  });

  it('Given a non-object, When called, Then returns false', () => {
    expect(isMattildaErrorResponse('string')).toBe(false);
    expect(isMattildaErrorResponse(123)).toBe(false);
  });

  it('Given an object with no mensaje or errors, When called, Then returns false', () => {
    expect(isMattildaErrorResponse({})).toBe(false);
  });
});

describe('getMattildaErrorMessage', () => {
  it('Given error with mensaje, When called, Then returns mensaje', () => {
    expect(getMattildaErrorMessage({ mensaje: 'fail', errors: [] })).toBe(
      'fail',
    );
  });

  it('Given error with errors array, When called, Then returns first error', () => {
    expect(getMattildaErrorMessage({ errors: ['err1', 'err2'] })).toBe('err1');
  });

  it('Given error with empty errors array, When called, Then returns default message', () => {
    expect(getMattildaErrorMessage({ errors: [] })).toBe(
      'An unknown error occurred',
    );
  });

  it('Given error with no mensaje or errors, When called, Then returns default message', () => {
    expect(getMattildaErrorMessage({} as any)).toBe(
      'An unknown error occurred',
    );
  });
});

describe('mapMattildaAxiosError', () => {
  it('Given an AxiosError with Mattilda error response, When called, Then throws MattildaApiException with correct data', () => {
    const error = {
      response: {
        status: 400,
        data: { id: 123, mensaje: 'fail', errors: [] },
      },
    };
    try {
      mapMattildaAxiosError(error);
      fail('Should throw');
    } catch (e) {
      expect(e).toBeInstanceOf(MattildaApiException);
      expect(e.code).toBe('123');
      expect(e.customMessage).toBe('fail');
      expect(e.getStatus()).toBe(400);
    }
  });

  it('Given an AxiosError with Mattilda error response with errors array, When called, Then throws MattildaApiException with first error', () => {
    const error = {
      response: {
        status: 502,
        data: { errors: ['err1', 'err2'] },
      },
    };
    try {
      mapMattildaAxiosError(error);
      fail('Should throw');
    } catch (e) {
      expect(e).toBeInstanceOf(MattildaApiException);
      expect(e.code).toBe('MATTILDA_API_ERROR');
      expect(e.customMessage).toBe('err1');
      expect(e.getStatus()).toBe(502);
    }
  });

  it('Given an AxiosError with no Mattilda error response, When called, Then rethrows original error', () => {
    const error = {
      response: {
        status: 500,
        data: { foo: 'bar' },
      },
    };
    expect(() => mapMattildaAxiosError(error)).toThrow();
  });

  it('Given an error with no response, When called, Then rethrows original error', () => {
    const error = { message: 'plain error' };
    expect(() => mapMattildaAxiosError(error)).toThrow();
  });

  it('Given an AxiosError with undefined status, When called, Then uses BAD_GATEWAY as default', () => {
    const error = {
      response: {
        data: { mensaje: 'fail' },
      },
    };
    try {
      mapMattildaAxiosError(error);
      fail('Should throw');
    } catch (e) {
      expect(e).toBeInstanceOf(MattildaApiException);
      expect(e.getStatus()).toBe(HttpStatus.BAD_GATEWAY);
    }
  });
});
