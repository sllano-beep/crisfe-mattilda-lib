import { ApiService, CoreLogger } from '@crisfe/commons';
import { Inject, Injectable } from '@nestjs/common';
import { api } from '../../common/mattilda.config';
import { MATTILDA_API_MODULE_OPTIONS } from '../../common/mattilda.constants';
import { MattildaApiModuleOptions } from '../../common/mattilda.types';
import { MattildaApiErrorHandler } from '../../utils/mattilda.decorator';
import { UserCreateRQ, UserCreateRS } from './common/mattilda-api-user.types';

@Injectable()
export class MattildaUserApiService {
  constructor(
    @Inject(MATTILDA_API_MODULE_OPTIONS)
    private readonly options: MattildaApiModuleOptions,
    private readonly apiService: ApiService,
  ) {}

  @MattildaApiErrorHandler()
  @CoreLogger()
  async postRegister<T = any>(
    periodId: string,
    payload: UserCreateRQ<T>,
  ): Promise<UserCreateRS<T>> {
    const { campusId, apiKey, domain } = this.options;
    const { base, users } = api;
    const url = `${domain}${base}${users}`;
    return this.apiService.post<UserCreateRQ<T>, UserCreateRS<T>>(
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

  @MattildaApiErrorHandler()
  @CoreLogger()
  async getById<T = any>(
    periodId: string,
    userId: string,
  ): Promise<UserCreateRS<T>> {
    const { campusId, apiKey, domain } = this.options;
    const { base, users } = api;
    const url = `${domain}${base}${users}/${userId}`;
    return await this.apiService.get<UserCreateRS<T>>(url, {
      headers: {
        api_key: apiKey,
        campusID: campusId,
        periodID: periodId,
      },
    });
  }
}
