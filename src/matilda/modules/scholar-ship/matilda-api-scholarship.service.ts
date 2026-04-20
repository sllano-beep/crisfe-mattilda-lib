import { ApiService, CoreLogger } from '@crisfe/commons';
import { Inject, Injectable } from '@nestjs/common';
import { api } from '../../common/matilda.config';
import { MATILDA_API_MODULE_OPTIONS } from '../../common/matilda.constants';
import { MatildaApiModuleOptions } from '../../common/matilda.types';
import { MatildaApiErrorHandler } from '../../utils/matilda.decorator';
import {
  CreateScholarshipRQ,
  ScholarshipSearch,
  ScholarshipSearchRS,
  ScholarshipRS,
} from './common/matilda-api-scholarship.type';

@Injectable()
export class MatildaApiScholarshipService {
  constructor(
    @Inject(MATILDA_API_MODULE_OPTIONS)
    private readonly options: MatildaApiModuleOptions,
    private readonly apiService: ApiService,
  ) {}

  @MatildaApiErrorHandler()
  @CoreLogger()
  async getSearch<T = any>(
    periodId: string,
    params: ScholarshipSearch,
  ): Promise<ScholarshipSearchRS<T>> {
    const { campusId, apiKey, domain } = this.options;
    const { base, scholarships } = api;
    const url = `${domain}${base}${scholarships}`;
    return await this.apiService.get<ScholarshipSearchRS<T>>(url, {
      headers: {
        api_key: apiKey,
        campusID: campusId,
        periodID: periodId,
      },
      params: {
        program_id: params.program_id,
        q: `name=${params.name}`,
      },
    });
  }

  @MatildaApiErrorHandler()
  @CoreLogger()
  async postCreate<T = any>(
    periodId: string,
    payload: CreateScholarshipRQ<T>,
  ): Promise<ScholarshipRS<T>> {
    const { campusId, apiKey, domain } = this.options;
    const { base, scholarships } = api;
    const url = `${domain}${base}${scholarships}`;
    return await this.apiService.post<CreateScholarshipRQ<T>, ScholarshipRS<T>>(
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
