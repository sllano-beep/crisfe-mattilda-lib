import { ApiService, CoreLogger } from '@crisfe/commons';
import { Inject, Injectable } from '@nestjs/common';
import { api } from '../../common/matilda.config';
import { MATILDA_API_MODULE_OPTIONS } from '../../common/matilda.constants';
import {
  MatildaApiModuleOptions,
  MatildaApiPagedRS,
} from '../../common/matilda.types';
import { MatildaApiErrorHandler } from '../../utils/matilda.decorator';
import { PeriodRS, PeriodSearch } from './common/matilda-api-period.types';

@Injectable()
export class MatildaApiPeriodService {
  constructor(
    @Inject(MATILDA_API_MODULE_OPTIONS)
    private readonly options: MatildaApiModuleOptions,
    private readonly apiService: ApiService,
  ) {}

  @CoreLogger()
  async postGetByName(name: string): Promise<PeriodRS> {
    return await this.postSearch({ name }).then((res) => res.data[0]);
  }

  @MatildaApiErrorHandler()
  @CoreLogger()
  async postSearch(params: PeriodSearch): Promise<MatildaApiPagedRS<PeriodRS>> {
    const { campusId, apiKey, domain } = this.options;
    const { base, periods } = api;
    const url = `${domain}${base}${periods}`;
    return this.apiService.post<unknown, MatildaApiPagedRS<PeriodRS>>(url, {
      headers: {
        api_key: apiKey,
        campusID: campusId,
      },
      params,
    });
  }
}
