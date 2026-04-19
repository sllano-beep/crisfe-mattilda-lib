import { ApiService } from '@crisfe/commons';
import { Test, TestingModule } from '@nestjs/testing';
import { MATILDA_API_MODULE_OPTIONS } from '../../../../src/matilda/common/matilda.constants';
import { MatildaApiModuleOptions } from '../../../../src/matilda/common/matilda.types';
import {
  PeriodRS,
  PeriodSearch,
} from '../../../../src/matilda/modules/period/common/matilda-api-period.types';
import { MatildaApiPeriodService } from '../../../../src/matilda/modules/period/matilda-api-period.service';

describe('MatildaApiPeriodService', () => {
  let service: MatildaApiPeriodService;
  let apiService: jest.Mocked<ApiService>;
  const options: MatildaApiModuleOptions = {
    campusId: 'campus-1',
    apiKey: 'api-key-1',
    domain: 'https://api.example.com',
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatildaApiPeriodService,
        { provide: ApiService, useValue: { post: jest.fn() } },
        { provide: MATILDA_API_MODULE_OPTIONS, useValue: options },
      ],
    }).compile();

    service = module.get(MatildaApiPeriodService);
    apiService = module.get(ApiService);
  });

  describe('postSearch', () => {
    const params: PeriodSearch = { name: '2026-A' };
    const pagedResponse = {
      items: 1,
      page: 1,
      total_pages: 1,
      data: [
        {
          id: 'period-1',
          name: '2026-A',
          start_date: '2026-01-01',
          end_date: '2026-06-30',
          status: 'active',
          is_default: true,
          parent_id: null,
          campus_id: 'campus-1',
        },
      ] as PeriodRS[],
    };

    it('Given valid search params, When postSearch is called, Then it should call apiService.post with correct URL, headers and params and return paged response', async () => {
      apiService.post.mockResolvedValue(pagedResponse);

      const result = await service.postSearch(params);

      expect(apiService.post).toHaveBeenCalledWith(
        expect.stringContaining('/periods'),
        expect.objectContaining({
          headers: expect.objectContaining({
            api_key: options.apiKey,
            campusID: options.campusId,
          }),
          params,
        }),
      );
      expect(result).toEqual(pagedResponse);
    });

    it('Given empty search params, When postSearch is called, Then it should call apiService.post with empty params object', async () => {
      apiService.post.mockResolvedValue({
        items: 0,
        page: 1,
        total_pages: 0,
        data: [],
      });

      const result = await service.postSearch({});

      expect(apiService.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ params: {} }),
      );
      expect(result.data).toEqual([]);
    });

    it('Given apiService.post throws an error, When postSearch is called, Then it should propagate the error', async () => {
      apiService.post.mockRejectedValue(new Error('API error'));

      await expect(service.postSearch(params)).rejects.toThrow('API error');
    });

    it('Given search params with all fields populated, When postSearch is called, Then it should forward all params to the API', async () => {
      const fullParams: PeriodSearch = {
        name: '2026-A',
        date_from: '2026-01-01',
        date_to: '2026-06-30',
        page: 2,
        status: 'active',
        external_id: 'EXT-P1',
        metadata: '{"key":"value"}',
      };
      apiService.post.mockResolvedValue(pagedResponse);

      await service.postSearch(fullParams);

      expect(apiService.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ params: fullParams }),
      );
    });
  });

  describe('postGetByName', () => {
    const periodRS: PeriodRS = {
      id: 'period-1',
      name: '2026-A',
      start_date: '2026-01-01',
      end_date: '2026-06-30',
      status: 'active',
      is_default: true,
      parent_id: null,
      campus_id: 'campus-1',
    };

    it('Given a valid name that matches a period, When postGetByName is called, Then it should return the first matching period', async () => {
      apiService.post.mockResolvedValue({
        items: 1,
        page: 1,
        total_pages: 1,
        data: [periodRS],
      });

      const result = await service.postGetByName('2026-A');

      expect(result).toEqual(periodRS);
      expect(apiService.post).toHaveBeenCalledWith(
        expect.stringContaining('/periods'),
        expect.objectContaining({
          params: { name: '2026-A' },
        }),
      );
    });

    it('Given a name that matches multiple periods, When postGetByName is called, Then it should return only the first one', async () => {
      const secondPeriod: PeriodRS = {
        ...periodRS,
        id: 'period-2',
        name: '2026-A-dup',
      };
      apiService.post.mockResolvedValue({
        items: 2,
        page: 1,
        total_pages: 1,
        data: [periodRS, secondPeriod],
      });

      const result = await service.postGetByName('2026-A');

      expect(result).toEqual(periodRS);
    });

    it('Given a name that matches no periods, When postGetByName is called, Then it should return undefined', async () => {
      apiService.post.mockResolvedValue({
        items: 0,
        page: 1,
        total_pages: 0,
        data: [],
      });

      const result = await service.postGetByName('non-existent');

      expect(result).toBeUndefined();
    });

    it('Given an empty string name, When postGetByName is called, Then it should forward empty name to postSearch', async () => {
      apiService.post.mockResolvedValue({
        items: 0,
        page: 1,
        total_pages: 0,
        data: [],
      });

      await service.postGetByName('');

      expect(apiService.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: { name: '' },
        }),
      );
    });

    it('Given apiService.post throws an error, When postGetByName is called, Then it should propagate the error', async () => {
      apiService.post.mockRejectedValue(new Error('Network error'));

      await expect(service.postGetByName('2026-A')).rejects.toThrow(
        'Network error',
      );
    });
  });
});
