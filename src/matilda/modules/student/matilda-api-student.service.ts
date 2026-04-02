import { ApiService, CoreLogger } from '@crisfe/commons';
import { Inject, Injectable } from '@nestjs/common';
import { api } from '../../common/matilda.config';
import { MATILDA_API_MODULE_OPTIONS } from '../../common/matilda.constants';
import { MatildaApiModuleOptions } from '../../common/matilda.types';
import { MatildaApiErrorHandler } from '../../utils/matilda.decorator';
import {
  StudentCreateRQ,
  StudentCreateRS,
} from './common/matilda-api-student.types';

@Injectable()
export class MatildaApiStudentService {
  constructor(
    @Inject(MATILDA_API_MODULE_OPTIONS)
    private readonly options: MatildaApiModuleOptions,
    private readonly apiService: ApiService,
  ) {}

  @MatildaApiErrorHandler()
  @CoreLogger()
  async postRegister<T = any>(
    periodId: string,
    payload: StudentCreateRQ<T>,
  ): Promise<StudentCreateRS<T>> {
    const { campusId, apiKey, domain } = this.options;
    const { base, students } = api;
    const url = `${domain}${base}${students}?apidogToken=9_6ZYSNgvrTQa6QSvMC9m`;
    return await this.apiService.post<StudentCreateRQ<T>, StudentCreateRS<T>>(
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
