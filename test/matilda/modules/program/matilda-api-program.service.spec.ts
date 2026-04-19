import { ApiService } from '@crisfe/commons';
import { Test, TestingModule } from '@nestjs/testing';
import { MATILDA_API_MODULE_OPTIONS } from '../../../../src/matilda/common/matilda.constants';
import { MatildaApiModuleOptions } from '../../../../src/matilda/common/matilda.types';
import {
  MatildaApiProgramRS,
  ProgramSearch,
} from '../../../../src/matilda/modules/program/common/matilda-api-program.types';
import { MatildaApiProgramService } from '../../../../src/matilda/modules/program/matilda-api-program.service';

describe('MatildaApiProgramService', () => {
  let service: MatildaApiProgramService;
  let apiService: { get: jest.Mock };

  const options: MatildaApiModuleOptions = {
    apiKey: 'test-api-key',
    campusId: 'campus-001',
    domain: 'https://matilda.local/',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatildaApiProgramService,
        {
          provide: MATILDA_API_MODULE_OPTIONS,
          useValue: options,
        },
        {
          provide: ApiService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MatildaApiProgramService>(MatildaApiProgramService);
    apiService = module.get(ApiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getSearch', () => {
    it('Given valid search params and period id When getSearch is called Then it should call ApiService.get with the expected request and return the response', async () => {
      const periodId = 'period-001';
      const params: ProgramSearch = { name: 'Math Program' };
      const expectedResponse = [
        {
          programID: 'program-001',
          name: 'Math Program',
        },
      ] as MatildaApiProgramRS[];

      apiService.get.mockResolvedValue(expectedResponse);

      const result = await service.getSearch(periodId, params);

      expect(apiService.get).toHaveBeenCalledTimes(1);
      expect(apiService.get).toHaveBeenCalledWith(
        'https://matilda.local/matti_api/v1/programs',
        {
          headers: {
            api_key: 'test-api-key',
            campusID: 'campus-001',
            periodID: periodId,
          },
          params,
        },
      );
      expect(result).toEqual(expectedResponse);
    });

    it('Given an unknown api error When getSearch is called Then it should rethrow the same error', async () => {
      const params: ProgramSearch = { name: 'Math Program' };
      const error = new Error('Unexpected network error');

      apiService.get.mockRejectedValue(error);

      await expect(service.getSearch('period-001', params)).rejects.toThrow(
        'Unexpected network error',
      );
    });
  });
});
