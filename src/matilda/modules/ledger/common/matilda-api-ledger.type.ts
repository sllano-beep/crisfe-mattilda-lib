import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { LedgerPrimaryConceptType } from './matilda-api-ledger.enums';
import { Type } from 'class-transformer';

export class LedgerItemRQ<T = any> {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  amount: number;

  @IsString()
  @IsNotEmpty()
  pay_date: string;

  @IsString()
  @IsOptional()
  external_id?: string;

  @IsString()
  @IsOptional()
  metadata?: T;
}

export class LedgerCreateRQ<T = any> {
  @IsString()
  @IsNotEmpty()
  program_id: string;

  @IsString()
  @IsNotEmpty()
  student_id: string;

  @IsEnum(LedgerPrimaryConceptType)
  primary_concept_type: LedgerPrimaryConceptType;

  @IsString()
  @IsOptional()
  primary_concept_id?: string;

  @IsArray()
  @IsNotEmpty()
  items: LedgerItemRQ<T>[];

  @IsString()
  @IsOptional()
  scholarship_id?: string;

  @IsString()
  @IsOptional()
  discount_id?: string;

  @IsString()
  @IsOptional()
  external_id?: string;

  @IsString()
  @IsOptional()
  metadata?: T;
}

export class LedgerStudentRS {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  created_at: string;

  @IsString()
  @IsNotEmpty()
  updated_at: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  first_last_name: string;

  @IsString()
  @IsNotEmpty()
  second_last_name: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsNumber()
  @IsNotEmpty()
  matti_id: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  enrollment: number;

  @IsString()
  @IsNotEmpty()
  external_id: string;

  @IsString()
  @IsNotEmpty()
  external_metadata: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}

export class LedgerItemRS {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  created_at: string;

  @IsString()
  @IsNotEmpty()
  updated_at: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  amount: number;

  @IsString()
  @IsNotEmpty()
  amount_type: string;

  @IsString()
  @IsNotEmpty()
  concept_type: string;

  @IsString()
  @IsNotEmpty()
  due_date: string;

  @IsString()
  @IsNotEmpty()
  apply_date: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}

export class LedgerCreateRS<T = any> {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  created_at: string;

  @IsString()
  @IsNotEmpty()
  updated_at: string;

  @IsString()
  @IsNotEmpty()
  concept_type: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  date_period: string;

  @IsString()
  @IsNotEmpty()
  due_date: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  amount: number;

  @IsString()
  @IsOptional()
  external_id?: string;

  @IsString()
  @IsOptional()
  external_metadata?: T;

  @IsString()
  @IsOptional()
  @Type(() => LedgerStudentRS)
  student?: LedgerStudentRS;

  @IsArray()
  @IsOptional()
  @Type(() => LedgerItemRS)
  items?: LedgerItemRS[];
}
