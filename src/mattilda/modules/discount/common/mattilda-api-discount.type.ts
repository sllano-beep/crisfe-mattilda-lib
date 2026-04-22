import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { DiscountStatus, DiscountType } from './mattilda-api-discount.enums';

export class CreateDiscountRQ<T = any> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  workday: boolean;

  @IsBoolean()
  apply_to_inscriptions: boolean;

  @IsBoolean()
  apply_to_memberships: boolean;

  @IsBoolean()
  not_apply_with_scholarship: boolean;

  @IsString()
  program_id: string;

  @IsInt()
  @Min(0)
  amount: number;

  @IsEnum(DiscountType)
  type: DiscountType;

  @IsInt()
  @Min(0)
  max_date: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(31)
  // Initial day of the range. Must be between 1 and 31.
  from_day?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  // Initial month of the range. Must be between 1 and 12.
  from_month?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(31)
  // Final day of the range. Must be between 1 and 31.
  to_day?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  // Final month of the range. Must be between 1 and 12.
  to_month?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  external_id?: string;

  @IsOptional()
  metadata?: T;
}

export class CreateDiscountItemRS {
  @IsInt()
  @Min(0)
  amount: number;

  @IsEnum(DiscountType)
  type: DiscountType;

  @IsInt()
  @Min(0)
  max_date: number;

  @IsInt()
  @Min(1)
  @Max(31)
  from_day: number;

  @IsInt()
  @Min(1)
  @Max(12)
  from_month: number;

  @IsInt()
  @Min(1)
  @Max(31)
  to_day: number;

  @IsInt()
  @Min(1)
  @Max(12)
  to_month: number;

  @IsBoolean()
  not_apply_with_scholarship: boolean;
}

export class CreateDiscountRS<T = any> {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  program_id: string;

  @IsBoolean()
  workday: boolean;

  @IsBoolean()
  apply_to_inscriptions: boolean;

  @IsBoolean()
  apply_to_memberships: boolean;

  @IsEnum(DiscountStatus)
  status: DiscountStatus;

  @IsString()
  @IsNotEmpty()
  external_id: string;

  @IsOptional()
  metadata: T;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDiscountItemRS)
  items: CreateDiscountItemRS[];
}
