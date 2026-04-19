import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { DocumentType, PersonStatus, PersonType } from './matilda.enums';

export class Person<T = any> {
  @IsString()
  id: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsString()
  @MaxLength(256, { message: 'Full name must be at most 256 characters' })
  name: string;

  @IsString()
  @MaxLength(256, { message: 'First last name must be at most 256 characters' })
  first_last_name: string;

  @IsString()
  @IsOptional()
  @MaxLength(256, {
    message: 'Second last name must be at most 256 characters',
  })
  second_last_name?: string;

  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  @MaxLength(256, { message: 'Full name must be at most 256 characters' })
  full_name: string;

  @IsEnum(PersonStatus, { message: 'Person status must be a valid enum value' })
  status: PersonStatus;

  @IsEnum(PersonType, { message: 'Person type must be a valid enum value' })
  type: PersonType;

  @IsString()
  @IsOptional()
  @MaxLength(18, { message: 'TIN must be at most 18 characters' })
  tin?: string;

  @IsOptional()
  @IsEnum(DocumentType, { message: 'Document type must be a valid enum value' })
  document_type?: DocumentType;

  @IsString()
  @IsOptional()
  external_id?: string;

  @IsObject()
  @IsOptional()
  metadata?: T;
}
