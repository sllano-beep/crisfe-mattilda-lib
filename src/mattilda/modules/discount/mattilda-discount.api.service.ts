import { ApiService, CoreLogger } from '@crisfe/commons';
import { Inject, Injectable } from '@nestjs/common';
import { api } from '../../common/mattilda.config';
import { MATTILDA_API_MODULE_OPTIONS } from '../../common/mattilda.constants';
import { MattildaApiModuleOptions } from '../../common/mattilda.types';
import { MattildaApiErrorHandler } from '../../utils/mattilda.decorator';
import {
  CreateDiscountRQ,
  CreateDiscountRS,
} from './common/mattilda-api-discount.type';

@Injectable()
export class MattildaDiscountApiService {
  constructor(
    @Inject(MATTILDA_API_MODULE_OPTIONS)
    private readonly options: MattildaApiModuleOptions,
    private readonly apiService: ApiService,
  ) {}

  @MattildaApiErrorHandler()
  @CoreLogger()
  async postDiscounts<T = any>(
    periodId: string,
    payload: CreateDiscountRQ<T>,
  ): Promise<CreateDiscountRS<T>> {
    const { campusId, apiKey, domain } = this.options;
    const { base, discounts } = api;
    const url = `${domain}${base}${discounts}`;
    return await this.apiService.post<CreateDiscountRQ<T>, CreateDiscountRS<T>>(
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
