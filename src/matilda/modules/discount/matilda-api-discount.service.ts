import { ApiService, CoreLogger } from '@crisfe/commons';
import { Inject, Injectable } from '@nestjs/common';
import { api } from '../../common/matilda.config';
import { MATILDA_API_MODULE_OPTIONS } from '../../common/matilda.constants';
import { MatildaApiModuleOptions } from '../../common/matilda.types';
import { MatildaApiErrorHandler } from '../../utils/matilda.decorator';
import { CreateDiscountRQ } from './common/matilda-api-discount.type';

@Injectable()
export class MatildaApiDiscountService {
  constructor(
    @Inject(MATILDA_API_MODULE_OPTIONS)
    private readonly options: MatildaApiModuleOptions,
    private readonly apiService: ApiService,
  ) {}

  @MatildaApiErrorHandler()
  @CoreLogger()
  async postDiscounts<T = any>(
    periodId: string,
    payload: CreateDiscountRQ<T>,
  ): Promise<unknown> {
    const { campusId, apiKey, domain } = this.options;
    const { base, discounts } = api;
    const url = `${domain}${base}${discounts}`;
    return await this.apiService.post<CreateDiscountRQ<T>, unknown>(
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
