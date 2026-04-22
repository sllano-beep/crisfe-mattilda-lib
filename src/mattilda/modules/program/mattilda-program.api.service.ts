import { ApiService, CoreLogger } from '@crisfe/commons';
import { Inject, Injectable } from '@nestjs/common';
import { api } from '../../common/mattilda.config';
import { MATTILDA_API_MODULE_OPTIONS } from '../../common/mattilda.constants';
import { MattildaApiModuleOptions } from '../../common/mattilda.types';
import { MattildaApiErrorHandler } from '../../utils/mattilda.decorator';
import {
  MattildaApiProgramRS,
  ProgramSearch,
} from './common/mattilda-api-program.types';

@Injectable()
export class MattildaProgramApiService {
  constructor(
    @Inject(MATTILDA_API_MODULE_OPTIONS)
    private readonly options: MattildaApiModuleOptions,
    private readonly apiService: ApiService,
  ) {}

  @MattildaApiErrorHandler()
  @CoreLogger()
  async getSearch<T = any>(
    periodId: string,
    params: ProgramSearch,
  ): Promise<MattildaApiProgramRS<T>[]> {
    const { campusId, apiKey, domain } = this.options;
    const { base, programs } = api;
    const url = `${domain}${base}${programs}`;
    return await this.apiService.get<MattildaApiProgramRS<T>[]>(url, {
      headers: {
        api_key: apiKey,
        campusID: campusId,
        periodID: periodId,
      },
      params,
    });
  }
}
