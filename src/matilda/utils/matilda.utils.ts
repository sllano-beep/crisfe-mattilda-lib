import { HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';
import { MatildaApiErrorRS } from '../common/matilda.types';
import { MatildaApiException } from './matilda.exception';

export function isMatildaErrorResponse(
  error: unknown,
): error is MatildaApiErrorRS {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const errorObj = error as {
    mensaje?: unknown;
    errors?: unknown;
  };

  return (
    typeof errorObj.mensaje === 'string' ||
    (Array.isArray(errorObj.errors) && typeof errorObj.errors[0] === 'string')
  );
}

export function getMatildaErrorMessage(error: MatildaApiErrorRS): string {
  if (error.mensaje) {
    return error.mensaje;
  }

  if (Array.isArray(error.errors) && error.errors.length > 0) {
    return error.errors[0];
  }

  return 'An unknown error occurred';
}

export function mapMatildaAxiosError(error: unknown): never {
  const axiosError = error as AxiosError<MatildaApiErrorRS>;
  const status = axiosError.response?.status;
  const data = axiosError.response?.data;

  if (isMatildaErrorResponse(data)) {
    const message = getMatildaErrorMessage(data);

    throw new MatildaApiException({
      code: String(data.id ?? 'MATILDA_API_ERROR'),
      message,
      status: (status as HttpStatus) ?? HttpStatus.BAD_GATEWAY,
    });
  }

  throw error;
}
