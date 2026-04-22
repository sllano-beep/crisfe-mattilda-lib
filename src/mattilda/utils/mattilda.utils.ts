import { HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';
import { MattildaApiErrorRS } from '../common/mattilda.types';
import { MattildaApiException } from './mattilda.exception';

export function isMattildaErrorResponse(
  error: unknown,
): error is MattildaApiErrorRS {
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

export function getMattildaErrorMessage(error: MattildaApiErrorRS): string {
  if (error.mensaje) {
    return error.mensaje;
  }

  if (Array.isArray(error.errors) && error.errors.length > 0) {
    return error.errors[0];
  }

  return 'An unknown error occurred';
}

export function mapMattildaAxiosError(error: unknown): never {
  const axiosError = error as AxiosError<MattildaApiErrorRS>;
  const status = axiosError.response?.status;
  const data = axiosError.response?.data;

  if (isMattildaErrorResponse(data)) {
    const message = getMattildaErrorMessage(data);

    throw new MattildaApiException({
      code: String(data.id ?? 'MATTILDA_API_ERROR'),
      message,
      status: (status as HttpStatus) ?? HttpStatus.BAD_GATEWAY,
    });
  }

  throw error;
}
