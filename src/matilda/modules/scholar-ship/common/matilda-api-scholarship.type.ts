import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { AdjustmentType } from 'src/matilda/common/matilda.enums';

export class ScholarshipSearch {
  @IsString()
  @IsNotEmpty()
  program_id: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  q?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}

export class ScholarshipListPagination {
  @IsInt()
  @Min(0)
  items: number;

  @IsInt()
  @Min(0)
  page: number;

  @IsInt()
  @Min(0)
  total_pages: number;
}

export class ScholarshipSearchRS<T = any> {
  @Type(() => ScholarshipListPagination)
  items: ScholarshipListPagination;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateScholarshipRS)
  data: CreateScholarshipRS<T>[];
}

export class CreateScholarshipRQ<T = any> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  program_id: string;

  @IsBoolean()
  apply_to_inscriptions: boolean;

  @IsBoolean()
  apply_to_memberships: boolean;

  @IsInt()
  @Min(0)
  amount: number;

  @IsEnum(AdjustmentType)
  type: AdjustmentType;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  external_id?: string;

  @IsOptional()
  metadata?: T;
}

export class CreateScholarshipRS<T = any> extends CreateScholarshipRQ<T> {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
