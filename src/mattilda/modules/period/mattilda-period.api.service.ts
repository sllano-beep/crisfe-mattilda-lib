import { ApiService, CoreLogger } from '@crisfe/commons';
import { Inject, Injectable } from '@nestjs/common';
import { api } from '../../common/mattilda.config';
import { MATTILDA_API_MODULE_OPTIONS } from '../../common/mattilda.constants';
import {
  MattildaApiModuleOptions,
  MattildaApiPagedRS,
} from '../../common/mattilda.types';
import { MattildaApiErrorHandler } from '../../utils/mattilda.decorator';
import { PeriodRS, PeriodSearch } from './common/mattilda-api-period.types';

@Injectable()
export class MattildaPeriodApiService {
  constructor(
    @Inject(MATTILDA_API_MODULE_OPTIONS)
    private readonly options: MattildaApiModuleOptions,
    private readonly apiService: ApiService,
  ) {}

  @CoreLogger()
  async postGetByName(name: string): Promise<PeriodRS> {
    return this.postSearch({ name }).then((res) => res.data[0]);
  }

  @MattildaApiErrorHandler()
  @CoreLogger()
  async postSearch(params: PeriodSearch): Promise<MattildaApiPagedRS<PeriodRS>> {
    const { campusId, apiKey, domain } = this.options;
    const { base, periods } = api;
    const url = `${domain}${base}${periods}`;
    return this.apiService.post<unknown, MattildaApiPagedRS<PeriodRS>>(url, {
      headers: {
        api_key: apiKey,
        campusID: campusId,
      },
      params,
    });
  }
}
