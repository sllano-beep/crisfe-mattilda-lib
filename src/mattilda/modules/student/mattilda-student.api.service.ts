import { ApiService, CoreLogger } from '@crisfe/commons';
import { Inject, Injectable } from '@nestjs/common';
import { api } from '../../common/mattilda.config';
import { MATTILDA_API_MODULE_OPTIONS } from '../../common/mattilda.constants';
import { MattildaApiModuleOptions } from '../../common/mattilda.types';
import { MattildaApiErrorHandler } from '../../utils/mattilda.decorator';
import {
  StudentCreateRQ,
  StudentCreateRS,
} from './common/mattilda-api-student.types';

@Injectable()
export class MattildaStudentApiService {
  constructor(
    @Inject(MATTILDA_API_MODULE_OPTIONS)
    private readonly options: MattildaApiModuleOptions,
    private readonly apiService: ApiService,
  ) {}

  @MattildaApiErrorHandler()
  @CoreLogger()
  async postRegister<T = any>(
    periodId: string,
    payload: StudentCreateRQ<T>,
  ): Promise<StudentCreateRS<T>> {
    const { campusId, apiKey, domain } = this.options;
    const { base, students } = api;
    const url = `${domain}${base}${students}`;
    return this.apiService.post<StudentCreateRQ<T>, StudentCreateRS<T>>(
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
