import { ApiService } from '@crisfe/commons';
import { Test, TestingModule } from '@nestjs/testing';
import { MATTILDA_API_MODULE_OPTIONS } from '../../../../src/mattilda/common/mattilda.constants';
import { MattildaApiModuleOptions } from '../../../../src/mattilda/common/mattilda.types';
import {
  UserCreateRQ,
  UserCreateRS,
} from '../../../../src/mattilda/modules/user/common/mattilda-api-user.types';
import { MattildaUserApiService } from '../../../../src/mattilda/modules/user/mattilda-user.api.service';

describe('MattildaUserApiService', () => {
  let service: MattildaUserApiService;
  let apiService: { post: jest.Mock };

  const options: MattildaApiModuleOptions = {
    apiKey: 'test-api-key',
    campusId: 'campus-001',
    domain: 'https://mattilda.local/',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MattildaUserApiService,
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

    service = module.get<MattildaUserApiService>(MattildaUserApiService);
    apiService = module.get(ApiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('postRegister', () => {
    it('Given a valid period id and user payload When postRegister is called Then it should call ApiService.post with the expected request and return the response', async () => {
      const periodId = 'period-001';
      const payload: UserCreateRQ<{ source: string }> = {
        name: 'Jane',
        first_last_name: 'Doe',
        email: 'jane.doe@example.com',
        phone: '+593999999999',
        external_id: 'ext-user-001',
        metadata: { source: 'unit-test' },
      };
      const expectedResponse = {
        external_id: 'ext-user-001',
      } as UserCreateRS<{ source: string }>;

      apiService.post.mockResolvedValue(expectedResponse);

      const result = await service.postRegister(periodId, payload);

      expect(apiService.post).toHaveBeenCalledTimes(1);
      expect(apiService.post).toHaveBeenCalledWith(
        'https://mattilda.local/matti_api/v1/users',
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
      const payload: UserCreateRQ = {
        name: 'Jane',
        first_last_name: 'Doe',
        email: 'jane.doe@example.com',
        phone: '+593999999999',
        external_id: 'ext-user-001',
      };
      const error = new Error('Unexpected network error');

      apiService.post.mockRejectedValue(error);

      await expect(service.postRegister('period-001', payload)).rejects.toThrow(
        'Unexpected network error',
      );
    });
  });
});
