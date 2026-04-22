import { ApiService } from '@crisfe/commons';
import { Test, TestingModule } from '@nestjs/testing';
import { MATTILDA_API_MODULE_OPTIONS } from '../../../../src/mattilda/common/mattilda.constants';
import { MattildaApiModuleOptions } from '../../../../src/mattilda/common/mattilda.types';
import { LedgerPrimaryConceptType } from '../../../../src/mattilda/modules/ledger/common/mattilda-api-ledger.enums';
import {
  LedgerCreateRQ,
  LedgerCreateRS,
} from '../../../../src/mattilda/modules/ledger/common/mattilda-api-ledger.type';
import { MattildaLedgerApiService } from '../../../../src/mattilda/modules/ledger/mattilda-ledger.api.service';

describe('MattildaLedgerApiService', () => {
  let service: MattildaLedgerApiService;
  let apiService: { get: jest.Mock; post: jest.Mock };

  const options: MattildaApiModuleOptions = {
    apiKey: 'test-api-key',
    campusId: 'campus-001',
    domain: 'https://mattilda.local/',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MattildaLedgerApiService,
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

    service = module.get<MattildaLedgerApiService>(MattildaLedgerApiService);
    apiService = module.get(ApiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getLedgerById', () => {
    it('Given a valid ledger id When getLedgerById is called Then it should call ApiService.get with the expected request and return the response', async () => {
      const ledgerId = 'ledger-001';
      const expectedResponse = {
        id: ledgerId,
        created_at: '2026-01-01T00:00:00.000Z',
        updated_at: '2026-01-01T00:00:00.000Z',
        concept_type: 'membership',
        status: 'active',
        date_period: '2026-01',
        due_date: new Date('2026-01-10'),
        description: 'Membership fee',
        amount: 25,
      } as LedgerCreateRS;

      apiService.get.mockResolvedValue(expectedResponse);

      const result = await service.getLedgerById(ledgerId);

      expect(apiService.get).toHaveBeenCalledTimes(1);
      expect(apiService.get).toHaveBeenCalledWith(
        'https://mattilda.local/matti_api/v1/ledger/ledger-001',
        {
          headers: {
            api_key: 'test-api-key',
            campusID: 'campus-001',
          },
        },
      );
      expect(result).toEqual(expectedResponse);
    });

    it('Given an unknown api error When getLedgerById is called Then it should rethrow the same error', async () => {
      const error = new Error('Unexpected network error');
      apiService.get.mockRejectedValue(error);

      await expect(service.getLedgerById('ledger-001')).rejects.toThrow(
        'Unexpected network error',
      );
    });
  });

  describe('postLedger', () => {
    it('Given a valid period id and ledger payload When postLedger is called Then it should call ApiService.post with the expected request and return the response', async () => {
      const periodId = 'period-001';
      const payload = {
        program_id: 'program-001',
        student_id: 'student-001',
        primary_concept_type: LedgerPrimaryConceptType.MEMBERSHIP,
        items: [
          {
            amount: 25,
            pay_date: '2026-01-10',
          },
        ],
      } as LedgerCreateRQ;

      const expectedResponse = [
        {
          id: 'ledger-001',
          created_at: '2026-01-01T00:00:00.000Z',
          updated_at: '2026-01-01T00:00:00.000Z',
          concept_type: 'membership',
          status: 'active',
          date_period: '2026-01',
          due_date: new Date('2026-01-10'),
          description: 'Membership fee',
          amount: 25,
        },
      ] as LedgerCreateRS[];

      apiService.post.mockResolvedValue(expectedResponse);

      const result = await service.postLedger(periodId, payload);

      expect(apiService.post).toHaveBeenCalledTimes(1);
      expect(apiService.post).toHaveBeenCalledWith(
        'https://mattilda.local/matti_api/v1/ledger',
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

    it('Given an unknown api error When postLedger is called Then it should rethrow the same error', async () => {
      const payload = {
        program_id: 'program-001',
        student_id: 'student-001',
        primary_concept_type: LedgerPrimaryConceptType.MEMBERSHIP,
        items: [
          {
            amount: 25,
            pay_date: '2026-01-10',
          },
        ],
      } as LedgerCreateRQ;
      const error = new Error('Unexpected network error');

      apiService.post.mockRejectedValue(error);

      await expect(service.postLedger('period-001', payload)).rejects.toThrow(
        'Unexpected network error',
      );
    });
  });
});
