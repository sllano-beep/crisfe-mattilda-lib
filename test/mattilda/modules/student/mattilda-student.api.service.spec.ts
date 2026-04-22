import { ApiService } from '@crisfe/commons';
import { Test, TestingModule } from '@nestjs/testing';
import { MATTILDA_API_MODULE_OPTIONS } from '../../../../src/mattilda/common/mattilda.constants';
import { MattildaApiModuleOptions } from '../../../../src/mattilda/common/mattilda.types';
import {
  StudentCreateRQ,
  StudentCreateRS,
} from '../../../../src/mattilda/modules/student/common/mattilda-api-student.types';
import { MattildaStudentApiService } from '../../../../src/mattilda/modules/student/mattilda-student.api.service';

describe('MattildaStudentApiService', () => {
  let service: MattildaStudentApiService;
  let apiService: { post: jest.Mock };

  const options: MattildaApiModuleOptions = {
    apiKey: 'test-api-key',
    campusId: 'campus-001',
    domain: 'https://mattilda.local/',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MattildaStudentApiService,
        {
          provide: MATTILDA_API_MODULE_OPTIONS,
          useValue: options,
        },
        {
          provide: ApiService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MattildaStudentApiService>(MattildaStudentApiService);
    apiService = module.get(ApiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('postRegister', () => {
    it('Given a valid period id and student payload When postRegister is called Then it should call ApiService.post with the expected request and return the response', async () => {
      const periodId = 'period-001';
      const payload: StudentCreateRQ<{ source: string }> = {
        name: 'John',
        first_last_name: 'Doe',
        parent_id: 'parent-001',
        tin: '1717171717',
        programID: 'program-001',
        metadata: { source: 'unit-test' },
        preloaded: false,
      };
      const expectedResponse = {
        group: 'A',
      } as StudentCreateRS<{ source: string }>;

      apiService.post.mockResolvedValue(expectedResponse);

      const result = await service.postRegister(periodId, payload);

      expect(apiService.post).toHaveBeenCalledTimes(1);
      expect(apiService.post).toHaveBeenCalledWith(
        'https://mattilda.local/matti_api/v1/students',
        payload,
        {
          headers: {
            api_key: 'test-api-key',
            campusID: 'campus-001',
            periodID: periodId,
          },
        },
      );
      expect(result).toEqual(expectedResponse);
    });

    it('Given an unknown api error When postRegister is called Then it should rethrow the same error', async () => {
      const payload: StudentCreateRQ = {
        name: 'John',
        first_last_name: 'Doe',
        parent_id: 'parent-001',
        tin: '1717171717',
        programID: 'program-001',
        metadata: null,
        preloaded: false,
      };
      const error = new Error('Unexpected network error');

      apiService.post.mockRejectedValue(error);

      await expect(service.postRegister('period-001', payload)).rejects.toThrow(
        'Unexpected network error',
      );
    });
  });
});
