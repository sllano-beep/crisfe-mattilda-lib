import { ApiService } from '@crisfe/commons';
import { Test, TestingModule } from '@nestjs/testing';
import { MATTILDA_API_MODULE_OPTIONS } from '../../../../src/mattilda/common/mattilda.constants';
import { MattildaApiModuleOptions } from '../../../../src/mattilda/common/mattilda.types';
import {
  CreateDiscountRQ,
  CreateDiscountRS,
} from '../../../../src/mattilda/modules/discount/common/mattilda-api-discount.types';
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
        { provide: ApiService, useValue: { post: jest.fn() } },
        { provide: MATTILDA_API_MODULE_OPTIONS, useValue: options },
      ],
    }).compile();

    service = module.get(MattildaDiscountApiService);
    apiService = module.get(ApiService);
  });

  describe('postDiscounts', () => {
    const periodId = 'period-1';
    const payload: CreateDiscountRQ = { name: 'Discount', amount: 10 } as any;
    const response: CreateDiscountRS = {
      id: 'disc-1',
      name: 'Discount',
      amount: 10,
    } as any;

    it('Given valid periodId and payload, When postDiscounts is called, Then it should call apiService.post with correct params and return response', async () => {
      apiService.post.mockResolvedValue(response);

      const result = await service.postDiscounts(periodId, payload);

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

    it('Given null periodId, When postDiscounts is called, Then it should still call apiService.post with null periodID header', async () => {
      apiService.post.mockResolvedValue(response);

      const result = await service.postDiscounts(null as any, payload);

      expect(apiService.post).toHaveBeenCalledWith(
        expect.any(String),
        payload,
        expect.objectContaining({
          headers: expect.objectContaining({
            periodID: null,
          }),
        }),
      );
      expect(result).toEqual(response);
    });

    it('Given undefined payload, When postDiscounts is called, Then it should call apiService.post with undefined payload', async () => {
      apiService.post.mockResolvedValue(response);

      const result = await service.postDiscounts(periodId, undefined as any);

      expect(apiService.post).toHaveBeenCalledWith(
        expect.any(String),
        undefined,
        expect.any(Object),
      );
      expect(result).toEqual(response);
    });

    it('Given apiService.post throws error, When postDiscounts is called, Then it should propagate the error', async () => {
      apiService.post.mockRejectedValue(new Error('API error'));

      await expect(service.postDiscounts(periodId, payload)).rejects.toThrow(
        'API error',
      );
    });
  });
});
