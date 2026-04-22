import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class MattildaApiProgramRS<T = any> {
  @IsString()
  programID: string;

  @IsString()
  @MaxLength(256, { message: 'Name must be at most 256 characters' })
  name: string;

  @IsString()
  externalId: string;

  @IsString()
  campusPeriodId: string;

  @IsObject()
  @IsOptional()
  metadata?: T;
}

export class ProgramSearch {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(256, { message: 'Name must be at most 256 characters' })
  name: string;
}
