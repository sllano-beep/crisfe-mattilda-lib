import { ApiService, CoreLogger } from '@crisfe/commons';
import { Inject, Injectable } from '@nestjs/common';
import { api } from '../../common/mattilda.config';
import { MATTILDA_API_MODULE_OPTIONS } from '../../common/mattilda.constants';
import { MattildaApiModuleOptions } from '../../common/mattilda.types';
import { MattildaApiErrorHandler } from '../../utils/mattilda.decorator';
import {
  LedgerCreateRQ,
  LedgerCreateRS,
} from './common/mattilda-api-ledger.type';

@Injectable()
export class MattildaLedgerApiService {
  constructor(
    @Inject(MATTILDA_API_MODULE_OPTIONS)
    private readonly options: MattildaApiModuleOptions,
    private readonly apiService: ApiService,
  ) {}

  @MattildaApiErrorHandler()
  @CoreLogger()
  async getLedgerById<T = any>(ledgerId: string): Promise<LedgerCreateRS<T>> {
    const { campusId, apiKey, domain } = this.options;
    const { base, ledger } = api;
    const url = `${domain}${base}${ledger}/${ledgerId}`;
    return await this.apiService.get<LedgerCreateRS<T>>(url, {
      headers: {
        api_key: apiKey,
        campusID: campusId,
      },
    });
  }

  @MattildaApiErrorHandler()
  @CoreLogger()
  async postLedger<T = any>(
    periodId: string,
    payload: LedgerCreateRQ<T>,
  ): Promise<LedgerCreateRS<T>[]> {
    const { campusId, apiKey, domain } = this.options;
    const { base, ledger } = api;
    const url = `${domain}${base}${ledger}`;
    return await this.apiService.post<LedgerCreateRQ<T>, LedgerCreateRS<T>[]>(
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
