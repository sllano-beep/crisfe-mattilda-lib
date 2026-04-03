import { ApiService, CoreLogger } from '@crisfe/commons';
import { Inject, Injectable } from '@nestjs/common';
import { api } from '../../common/matilda.config';
import { MATILDA_API_MODULE_OPTIONS } from '../../common/matilda.constants';
import { MatildaApiModuleOptions } from '../../common/matilda.types';
import { MatildaApiErrorHandler } from '../../utils/matilda.decorator';
import { CreateScholarshipRQ } from './common/matilda-api-scholarship.type';

export class MatildaApiScholarshipHeaders {
  campusID?: string;
}

@Injectable()
export class MatildaApiScholarshipService {
  constructor(
    @Inject(MATILDA_API_MODULE_OPTIONS)
    private readonly options: MatildaApiModuleOptions,
    private readonly apiService: ApiService,
  ) {}

  @MatildaApiErrorHandler()
  @CoreLogger()
  async postScholarships<T = any>(
    payload: CreateScholarshipRQ<T>,
    periodId: string,
  ): Promise<unknown> {
    const { campusId, apiKey, domain } = this.options;
    const { base, scholarships } = api;
    const url = `${domain}${base}${scholarships}`;
    return await this.apiService.post<CreateScholarshipRQ<T>, unknown>(
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
