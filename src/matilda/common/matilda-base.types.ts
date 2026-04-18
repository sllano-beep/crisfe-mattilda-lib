import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Max,
} from 'class-validator';
import {
  UserStatus,
  UserType,
} from '../modules/user/common/matilda-api-user.enums';
import { DocumentType } from './matilda.enums';

export class Person<T = any> {
  @IsUUID()
  id: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsString()
  @Max(256, { message: 'Full name must be at most 256 characters' })
  name: string;

  @IsString()
  @Max(256, { message: 'First last name must be at most 256 characters' })
  first_last_name: string;

  @IsString()
  @IsOptional()
  @Max(256, { message: 'Second last name must be at most 256 characters' })
  second_last_name?: string;

  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  @Max(256, { message: 'Full name must be at most 256 characters' })
  full_name: string;

  @IsEnum(UserStatus, { message: 'User status must be a valid enum value' })
  status: UserStatus;

  @IsEnum(UserType, { message: 'User type must be a valid enum value' })
  type: UserType;

  @IsString()
  @IsOptional()
  @Max(18, { message: 'TIN must be at most 18 characters' })
  tin?: string;

  @IsOptional()
  @IsEnum(DocumentType, { message: 'Document type must be a valid enum value' })
  document_type?: DocumentType;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @Max(256, { message: 'Email must be at most 256 characters' })
  email?: string;

  @IsPhoneNumber()
  @Max(256, { message: 'Phone must be at most 256 characters' })
  phone?: string;

  @IsString()
  @IsOptional()
  @Max(256, { message: 'Username must be at most 256 characters' })
  username?: string;

  @IsDate()
  @IsOptional()
  last_login?: Date;

  @IsBoolean()
  is_on_boarding: boolean = false;

  @IsString()
  @IsOptional()
  external_id?: string;

  @IsObject()
  @IsOptional()
  metadata?: T;
}
