import { mapMatildaAxiosError } from './matilda.utils';

export function MatildaApiErrorHandler(): MethodDecorator {
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
        mapMatildaAxiosError(error);
      }
    };

    return descriptor;
  };
}
