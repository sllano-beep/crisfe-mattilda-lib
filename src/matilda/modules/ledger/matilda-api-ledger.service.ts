import { ApiService, CoreLogger } from '@crisfe/commons';
import { Inject, Injectable } from '@nestjs/common';
import { api } from '../../common/matilda.config';
import { MATILDA_API_MODULE_OPTIONS } from '../../common/matilda.constants';
import { MatildaApiModuleOptions } from '../../common/matilda.types';
import { MatildaApiErrorHandler } from '../../utils/matilda.decorator';
import {
  LedgerCreateRQ,
  LedgerCreateRS,
} from './common/matilda-api-ledger.type';

@Injectable()
export class MatildaApiLedgerService {
  constructor(
    @Inject(MATILDA_API_MODULE_OPTIONS)
    private readonly options: MatildaApiModuleOptions,
    private readonly apiService: ApiService,
  ) {}

  @MatildaApiErrorHandler()
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

  @MatildaApiErrorHandler()
  @CoreLogger()
  async postLedger<T = any>(
    periodId: string,
    payload: LedgerCreateRQ<T>,
  ): Promise<LedgerCreateRS<T>> {
    const { campusId, apiKey, domain } = this.options;
    const { base, ledger } = api;
    const url = `${domain}${base}${ledger}`;
    return await this.apiService.post<LedgerCreateRQ<T>, LedgerCreateRS<T>>(
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
