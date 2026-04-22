import { ApiService, CoreLogger } from '@crisfe/commons';
import { Inject, Injectable } from '@nestjs/common';
import { api } from '../../common/mattilda.config';
import { MATTILDA_API_MODULE_OPTIONS } from '../../common/mattilda.constants';
import { MattildaApiModuleOptions } from '../../common/mattilda.types';
import { MattildaApiErrorHandler } from '../../utils/mattilda.decorator';
import {
  CreateScholarshipRQ,
  ScholarshipSearch,
  ScholarshipSearchRS,
  ScholarshipRS,
} from './common/mattilda-api-scholarship.types';

@Injectable()
export class MattildaScholarshipApiService {
  constructor(
    @Inject(MATTILDA_API_MODULE_OPTIONS)
    private readonly options: MattildaApiModuleOptions,
    private readonly apiService: ApiService,
  ) {}

  @MattildaApiErrorHandler()
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

  @MattildaApiErrorHandler()
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
