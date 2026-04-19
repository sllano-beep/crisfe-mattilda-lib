import { ApiService, CoreLogger } from '@crisfe/commons';
import { Inject, Injectable } from '@nestjs/common';
import { api } from '../../common/matilda.config';
import { MATILDA_API_MODULE_OPTIONS } from '../../common/matilda.constants';
import { MatildaApiModuleOptions } from '../../common/matilda.types';
import { MatildaApiErrorHandler } from '../../utils/matilda.decorator';
import {
  MatildaApiProgramRS,
  ProgramSearch,
} from './common/matilda-api-program.types';

@Injectable()
export class MatildaApiProgramService {
  constructor(
    @Inject(MATILDA_API_MODULE_OPTIONS)
    private readonly options: MatildaApiModuleOptions,
    private readonly apiService: ApiService,
  ) {}

  @MatildaApiErrorHandler()
  @CoreLogger()
  async getSearch<T = any>(
    periodId: string,
    params: ProgramSearch,
  ): Promise<MatildaApiProgramRS<T>[]> {
    const { campusId, apiKey, domain } = this.options;
    const { base, programs } = api;
    const url = `${domain}${base}${programs}`;
    return await this.apiService.get<MatildaApiProgramRS<T>[]>(url, {
      headers: {
        api_key: apiKey,
        campusID: campusId,
        periodID: periodId,
      },
      params,
    });
  }
}
