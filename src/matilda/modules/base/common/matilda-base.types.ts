import {
  IsUUID,
  IsDate,
  IsString,
  Max,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  IsEmail,
  IsPhoneNumber,
  IsBoolean,
  IsObject,
} from 'class-validator';
import { UserStatus, UserType } from '../../user/common/matilda-api-user.enums';

export class Person<T = Record<string, unknown>> {
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
  second_last_name: string | null | undefined;

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
  tin: string | null | undefined;

  @IsOptional()
  @IsEnum(DocumentType, { message: 'Document type must be a valid enum value' })
  document_type: DocumentType | null | undefined;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @Max(256, { message: 'Email must be at most 256 characters' })
  email: string | null | undefined;

  @IsPhoneNumber()
  @Max(256, { message: 'Phone must be at most 256 characters' })
  phone: string | null | undefined;

  @IsString()
  @IsOptional()
  @Max(256, { message: 'Username must be at most 256 characters' })
  username: string | null | undefined;

  @IsDate()
  @IsOptional()
  last_login: Date | null | undefined;

  @IsBoolean()
  is_on_boarding: boolean = false;

  @IsString()
  @IsOptional()
  external_id: string | null | undefined;

  @IsObject()
  @IsOptional()
  metadata: T | null | undefined;
}
