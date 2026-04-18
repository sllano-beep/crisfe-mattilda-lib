import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { Person } from '../../../common/matilda-base.types';
import { DocumentType } from '../../../common/matilda.enums';

export class User<T = any> extends Person<T> {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @MaxLength(256, { message: 'Email must be at most 256 characters' })
  email?: string;

  @IsPhoneNumber()
  @MaxLength(256, { message: 'Phone must be at most 256 characters' })
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(256, { message: 'Username must be at most 256 characters' })
  username?: string;

  @IsDate()
  @IsOptional()
  last_login?: Date;

  @IsBoolean()
  is_on_boarding: boolean = false;
}

export class UserCreateRQ<T = any> {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(256, { message: 'Name must be at most 256 characters' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'First last name is required' })
  @MaxLength(256, { message: 'First last name must be at most 256 characters' })
  first_last_name: string;

  @IsString()
  @IsOptional()
  @MaxLength(256, {
    message: 'Second last name must be at most 256 characters',
  })
  second_last_name?: string;

  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(256, { message: 'Email must be at most 256 characters' })
  email: string;

  @MaxLength(18, { message: 'TIN must be at most 18 characters' })
  @IsString()
  @IsOptional()
  tin?: string;

  @IsOptional()
  @IsEnum(DocumentType, { message: 'Document type must be a valid enum value' })
  document_type?: DocumentType;

  @IsString()
  @IsNotEmpty({ message: 'Phone is required' })
  @MaxLength(256, { message: 'Phone must be at most 256 characters' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'External ID is required' })
  external_id: string;

  @IsOptional()
  metadata?: T;
}

export class UserCreateRS<T = any> extends User<T> {}
