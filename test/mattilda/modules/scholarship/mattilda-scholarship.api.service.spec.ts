import { ApiService } from '@crisfe/commons';
import { Test, TestingModule } from '@nestjs/testing';
import { MATTILDA_API_MODULE_OPTIONS } from '../../../../src/mattilda/common/mattilda.constants';
import { MattildaApiModuleOptions } from '../../../../src/mattilda/common/mattilda.types';
import { DiscountType } from '../../../../src/mattilda/modules/discount/common/mattilda-api-discount.enums';
import {
  CreateScholarshipRQ,
  ScholarshipRS,
  ScholarshipSearch,
  ScholarshipSearchRS,
} from '../../../../src/mattilda/modules/scholarship/common/mattilda-api-scholarship.types';
import { MattildaScholarshipApiService } from '../../../../src/mattilda/modules/scholarship/mattilda-scholarship.api.service';

describe('MattildaScholarshipApiService', () => {
  let service: MattildaScholarshipApiService;
  let apiService: { get: jest.Mock; post: jest.Mock };

  const options: MattildaApiModuleOptions = {
    apiKey: 'test-api-key',
    campusId: 'campus-001',
    domain: 'https://mattilda.local/',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MattildaScholarshipApiService,
        {
          provide: MATTILDA_API_MODULE_OPTIONS,
          useValue: options,
        },
        {
          provide: ApiService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MattildaScholarshipApiService>(
      MattildaScholarshipApiService,
    );
    apiService = module.get(ApiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getSearch', () => {
    it('Given valid search params and period id When getSearch is called Then it should call ApiService.get with expected request and return the response', async () => {
      const periodId = 'period-001';
      const params: ScholarshipSearch = {
        name: 'Scholarship A',
        program_id: 'program-001',
      };
      const expectedResponse = {
        items: 1,
        page: 1,
        total_pages: 1,
        data: [
          {
            id: 'sch-001',
            name: 'Scholarship A',
            description: 'Description',
            program_id: 'program-001',
            apply_to_inscriptions: true,
            apply_to_memberships: false,
            amount: 10,
            type: DiscountType.INTEGER,
            status: 'ACTIVE',
          },
        ],
      } as ScholarshipSearchRS;

      apiService.get.mockResolvedValue(expectedResponse);

      const result = await service.getSearch(periodId, params);

      expect(apiService.get).toHaveBeenCalledTimes(1);
      expect(apiService.get).toHaveBeenCalledWith(
        'https://mattilda.local/matti_api/v1/scholarships',
        {
          headers: {
            api_key: 'test-api-key',
            campusID: 'campus-001',
            periodID: periodId,
          },
          params: {
            program_id: 'program-001',
            q: 'name=Scholarship A',
          },
        },
      );
      expect(result).toEqual(expectedResponse);
    });

    it('Given an unknown api error When getSearch is called Then it should rethrow the same error', async () => {
      const error = new Error('Unexpected network error');
      apiService.get.mockRejectedValue(error);

      await expect(
        service.getSearch('period-001', {
          name: 'Scholarship A',
          program_id: 'program-001',
        }),
      ).rejects.toThrow('Unexpected network error');
    });
  });

  describe('postCreate', () => {
    it('Given a valid scholarship payload and period id When postCreate is called Then it should call ApiService.post with expected request and return the response', async () => {
      const periodId = 'period-001';
      const payload = {
        name: 'Scholarship A',
        description: 'Description',
        program_id: 'program-001',
        apply_to_inscriptions: true,
        apply_to_memberships: false,
        amount: 10,
        type: DiscountType.PERCENTAGE,
      } as CreateScholarshipRQ;
      const expectedResponse = {
        ...payload,
        id: 'sch-001',
        status: 'ACTIVE',
      } as ScholarshipRS;

      apiService.post.mockResolvedValue(expectedResponse);

      const result = await service.postCreate(periodId, payload);

      expect(apiService.post).toHaveBeenCalledTimes(1);
      expect(apiService.post).toHaveBeenCalledWith(
        'https://mattilda.local/matti_api/v1/scholarships',
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

    it('Given an unknown api error When postCreate is called Then it should rethrow the same error', async () => {
      const payload = {
        name: 'Scholarship A',
        description: 'Description',
        program_id: 'program-001',
        apply_to_inscriptions: true,
        apply_to_memberships: false,
        amount: 10,
        type: DiscountType.PERCENTAGE,
      } as CreateScholarshipRQ;
      const error = new Error('Unexpected network error');

      apiService.post.mockRejectedValue(error);

      await expect(service.postCreate('period-001', payload)).rejects.toThrow(
        'Unexpected network error',
      );
    });
  });
});
