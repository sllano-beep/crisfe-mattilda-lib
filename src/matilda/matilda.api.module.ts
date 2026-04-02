import { ApiModule } from '@crisfe/commons';
import { DynamicModule, Module } from '@nestjs/common';
import { MATILDA_API_MODULE_OPTIONS } from './common/matilda.constants';
import { MatildaApiModuleOptions } from './common/matilda.types';
import { MatildaApiPeriodService } from './modules/period/matilda-api-period.service';
import { MatildaApiUserService } from './modules/user/matilda-api-user.service';
import { MatildaApiStudentService } from './modules/student/matilda-api-student.service';

@Module({})
export class MatildaApiModule {
  register(options: MatildaApiModuleOptions): DynamicModule {
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
      ],
      exports: [
        MatildaApiUserService,
        MatildaApiPeriodService,
        MatildaApiStudentService,
      ],
    };
  }
}
