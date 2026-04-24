import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { DiscountType } from '../../discount/common/mattilda-api-discount.enums';

export class ScholarshipSearch {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256, { message: 'Name must be at most 256 characters' })
  name: string;

  @IsString()
  @IsNotEmpty()
  program_id: string;
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

export class ScholarshipSearchRS<T = any> extends ScholarshipListPagination  {
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

  @IsNumber()
  @Min(0)
  amount: number;

  @IsEnum(DiscountType)
  type: DiscountType;

  @IsString()
  @IsOptional()
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

export class ScholarshipRS<T = any> extends CreateScholarshipRS<T> {}
