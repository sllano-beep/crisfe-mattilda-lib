import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  Max,
} from 'class-validator';
import { Person } from '../../base/common/matilda-base.types';
import { DocumentType } from './matilda-api-user.enums';

export class UserCreateRQ<T = Record<string, unknown>> {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Max(256, { message: 'Name must be at most 256 characters' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'First last name is required' })
  @Max(256, { message: 'First last name must be at most 256 characters' })
  first_last_name: string;

  @IsString()
  @IsOptional()
  @Max(256, { message: 'Second last name must be at most 256 characters' })
  second_last_name: string | null | undefined;

  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Max(18, { message: 'TIN must be at most 18 characters' })
  @IsString()
  @IsOptional()
  tin: string | null | undefined;

  @IsOptional()
  @IsEnum(DocumentType, { message: 'Document type must be a valid enum value' })
  document_type: DocumentType | null | undefined;

  @IsString()
  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'External ID is required' })
  external_id: string;

  @IsNotEmptyObject()
  metadata: T;
}

export class UserCreateRS<T = Record<string, unknown>> extends Person<T> {}
