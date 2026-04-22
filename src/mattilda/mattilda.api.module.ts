import { ApiModule } from '@crisfe/commons';
import { DynamicModule, Module } from '@nestjs/common';
import { MATTILDA_API_MODULE_OPTIONS } from './common/mattilda.constants';
import { MattildaApiModuleOptions } from './common/mattilda.types';
import { MattildaPeriodApiService } from './modules/period/mattilda-period.api.service';
import { MattildaUserApiService } from './modules/user/mattilda-user.api.service';
import { MattildaStudentApiService } from './modules/student/mattilda-student.api.service';
import { MattildaProgramApiService } from './modules/program/mattilda-program.api.service';
import { MattildaDiscountApiService } from './modules/discount/mattilda-discount.api.service';
import { MattildaScholarshipApiService } from './modules/scholarship/mattilda-scholarship.api.service';
import { MattildaLedgerApiService } from './modules/ledger/mattilda-ledger.api.service';

@Module({})
export class MattildaApiModule {
  static register(options: MattildaApiModuleOptions): DynamicModule {
    return {
      module: MattildaApiModule,
      imports: [ApiModule.register()],
      providers: [
        {
          provide: MATTILDA_API_MODULE_OPTIONS,
          useValue: options,
        },
        MattildaUserApiService,
        MattildaPeriodApiService,
        MattildaStudentApiService,
        MattildaProgramApiService,
        MattildaDiscountApiService,
        MattildaScholarshipApiService,
        MattildaLedgerApiService,
      ],
      exports: [
        MattildaUserApiService,
        MattildaPeriodApiService,
        MattildaStudentApiService,
        MattildaProgramApiService,
        MattildaDiscountApiService,
        MattildaScholarshipApiService,
        MattildaLedgerApiService,
      ],
    };
  }
}
