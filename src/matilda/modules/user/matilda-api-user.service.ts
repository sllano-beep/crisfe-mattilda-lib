import { ApiService, CoreLogger } from '@crisfe/commons';
import { Inject, Injectable } from '@nestjs/common';
import { api } from '../../common/matilda.config';
import { MATILDA_API_MODULE_OPTIONS } from '../../common/matilda.constants';
import { MatildaApiModuleOptions } from '../../common/matilda.types';
import { MatildaApiErrorHandler } from '../../utils/matilda.decorator';
import { UserCreateRQ, UserCreateRS } from './common/matilda-api-user.types';

@Injectable()
export class MatildaApiUserService {
  constructor(
    @Inject(MATILDA_API_MODULE_OPTIONS)
    private readonly options: MatildaApiModuleOptions,
    private readonly apiService: ApiService,
  ) {}

  @MatildaApiErrorHandler()
  @CoreLogger()
  async postRegister<T = any>(
    periodId: string,
    payload: UserCreateRQ<T>,
  ): Promise<UserCreateRS<T>> {
    const { campusId, apiKey, domain } = this.options;
    const { base, users } = api;
    const url = `${domain}${base}${users}`;
    return await this.apiService.post<UserCreateRQ<T>, UserCreateRS<T>>(
      url,
      payload,
      {
        headers: {
          api_key: apiKey,
          campusID: campusId,
          periodID: periodId,
        },
      },
    );
  }
}
