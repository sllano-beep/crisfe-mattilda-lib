import { ApiModule } from '@crisfe/commons';
import { DynamicModule, Module } from '@nestjs/common';
import { MATILDA_API_MODULE_OPTIONS } from './common/matilda.constants';
import { MatildaApiModuleOptions } from './common/matilda.types';
import { MatildaApiPeriodService } from './modules/period/matilda-api-period.service';
import { MatildaApiUserService } from './modules/user/matilda-api-user.service';
import { MatildaApiStudentService } from './modules/student/matilda-api-student.service';
import { MatildaApiProgramService } from './modules/program/matilda-api-program.service';
import { MatildaApiDiscountService } from './modules/discount/matilda-api-discount.service';
import { MatildaApiScholarshipService } from './modules/scholar-ship/matilda-api-scholarship.service';
import { MatildaApiLedgerService } from './modules/ledger/matilda-api-ledger.service';

@Module({})
export class MatildaApiModule {
  static register(options: MatildaApiModuleOptions): DynamicModule {
    return {
      module: MatildaApiModule,
      imports: [ApiModule.register()],
      providers: [
        {
          provide: MATILDA_API_MODULE_OPTIONS,
          useValue: options,
        },
        MatildaApiUserService,
        MatildaApiPeriodService,
        MatildaApiStudentService,
        MatildaApiProgramService,
        MatildaApiDiscountService,
        MatildaApiScholarshipService,
        MatildaApiLedgerService,
      ],
      exports: [
        MatildaApiUserService,
        MatildaApiPeriodService,
        MatildaApiStudentService,
        MatildaApiProgramService,
        MatildaApiDiscountService,
        MatildaApiScholarshipService,
        MatildaApiLedgerService,
      ],
    };
  }
}
