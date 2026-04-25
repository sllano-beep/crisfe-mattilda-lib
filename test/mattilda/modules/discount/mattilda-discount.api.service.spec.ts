import { ApiService } from '@crisfe/commons';
import { Test, TestingModule } from '@nestjs/testing';
import { MATTILDA_API_MODULE_OPTIONS } from '../../../../src/mattilda/common/mattilda.constants';
import { MattildaApiModuleOptions } from '../../../../src/mattilda/common/mattilda.types';
import {
  CreateDiscountRQ,
  CreateDiscountRS,
  DiscountSearch,
  DiscountSearchRS,
} from '../../../../src/mattilda/modules/discount/common/mattilda-api-discount.types';
import {
  DiscountStatus,
  DiscountType,
} from '../../../../src/mattilda/modules/discount/common/mattilda-api-discount.enums';
import { MattildaDiscountApiService } from '../../../../src/mattilda/modules/discount/mattilda-discount.api.service';

describe('MattildaDiscountApiService', () => {
  let service: MattildaDiscountApiService;
  let apiService: jest.Mocked<ApiService>;
  const options: MattildaApiModuleOptions = {
    campusId: 'campus-1',
    apiKey: 'api-key-1',
    domain: 'https://api.example.com',
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MattildaDiscountApiService,
        { provide: ApiService, useValue: { get: jest.fn(), post: jest.fn() } },
        { provide: MATTILDA_API_MODULE_OPTIONS, useValue: options },
      ],
    }).compile();

    service = module.get(MattildaDiscountApiService);
    apiService = module.get(ApiService);
  });

  describe('getSearch', () => {
    const periodId = 'period-1';
    const params: DiscountSearch = {
      name: 'Discount A',
      program_id: 'prm-1',
    };

    it('Given valid params, When getSearch is called, Then it should call apiService.get with expected headers and query params', async () => {
      const response: DiscountSearchRS = {
        items: 1,
        page: 1,
        total_pages: 1,
        data: [
          {
            id: 'dsc-1',
            name: 'Discount A',
            program_id: 'prm-1',
            workday: true,
            apply_to_inscriptions: false,
            apply_to_memberships: true,
            status: DiscountStatus.ACTIVE,
            external_id: '',
            metadata: {},
            items: [
              {
                amount: 10,
                type: DiscountType.INTEGER,
                max_date: 5,
                from_day: 0,
                from_month: 0,
                to_day: 0,
                to_month: 0,
                not_apply_with_scholarship: false,
              },
            ],
          },
        ],
      };
      apiService.get.mockResolvedValue(response);

      const result = await service.getSearch(periodId, params);

      expect(apiService.get).toHaveBeenCalledWith(
        expect.stringContaining('/discounts'),
        expect.objectContaining({
          headers: expect.objectContaining({
            api_key: options.apiKey,
            campusID: options.campusId,
            periodID: periodId,
          }),
          params: {
            program_id: params.program_id,
            q: `name=${params.name}`,
          },
        }),
      );
      expect(result).toEqual(response);
    });

    it('Given apiService.get throws error, When getSearch is called, Then it should propagate the error', async () => {
      apiService.get.mockRejectedValue(new Error('API error'));

      await expect(service.getSearch(periodId, params)).rejects.toThrow(
        'API error',
      );
    });
  });

  describe('postCreate', () => {
    const periodId = 'period-1';
    const payload: CreateDiscountRQ = {
      name: 'Discount',
      workday: false,
      apply_to_inscriptions: false,
      apply_to_memberships: true,
      not_apply_with_scholarship: false,
      program_id: 'prm-1',
      amount: 10,
      type: DiscountType.INTEGER,
      max_date: 5,
      from_day: 0,
      from_month: 0,
      to_day: 0,
      to_month: 0,
    };
    const response: CreateDiscountRS = {
      id: 'disc-1',
      name: 'Discount',
      program_id: 'prm-1',
      workday: false,
      apply_to_inscriptions: false,
      apply_to_memberships: true,
      status: DiscountStatus.ACTIVE,
      external_id: '',
      metadata: {},
      items: [
        {
          amount: 10,
          type: DiscountType.INTEGER,
          max_date: 5,
          from_day: 0,
          from_month: 0,
          to_day: 0,
          to_month: 0,
          not_apply_with_scholarship: false,
        },
      ],
    };

    it('Given valid periodId and payload, When postCreate is called, Then it should call apiService.post with correct params and return response', async () => {
      apiService.post.mockResolvedValue(response);

      const result = await service.postCreate(periodId, payload);

      expect(apiService.post).toHaveBeenCalledWith(
        expect.stringContaining('/discounts'),
        payload,
        expect.objectContaining({
          headers: expect.objectContaining({
            api_key: options.apiKey,
            campusID: options.campusId,
            periodID: periodId,
          }),
        }),
      );
      expect(result).toEqual(response);
    });

    it('Given apiService.post throws error, When postCreate is called, Then it should propagate the error', async () => {
      apiService.post.mockRejectedValue(new Error('API error'));

      await expect(service.postCreate(periodId, payload)).rejects.toThrow(
        'API error',
      );
    });
  });
});
