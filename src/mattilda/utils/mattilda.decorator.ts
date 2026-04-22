import { mapMattildaAxiosError } from './mattilda.utils';

export function MattildaApiErrorHandler(): MethodDecorator {
  return (
    _target: object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        mapMattildaAxiosError(error);
      }
    };

    return descriptor;
  };
}
