import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Person } from '../../../common/mattilda-base.types';
import { DocumentType } from '../../../common/mattilda.enums';

export class Student<T = any> extends Person<T> {
  @IsString()
  @IsOptional()
  group?: string;

  @IsString()
  @IsOptional()
  grade?: string;

  @IsString()
  @IsOptional()
  period_id?: string;
}

export class StudentCreateRQ<T = any> {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256, { message: 'Name must be at most 256 characters' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256, { message: 'First last name must be at most 256 characters' })
  first_last_name: string;

  @IsString()
  @IsOptional()
  @MaxLength(256, {
    message: 'Second last name must be at most 256 characters',
  })
  second_last_name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(256, { message: 'Enrollment must be at most 256 characters' })
  enrollment?: string;

  @IsString()
  @IsOptional()
  @MaxLength(256, { message: 'Grade must be at most 256 characters' })
  grade?: string;

  @IsString()
  @IsOptional()
  @MaxLength(256, { message: 'Group must be at most 256 characters' })
  group?: string;

  /**
   * User ID to be related to the Student.
   */
  @IsString()
  @IsNotEmpty()
  parent_id: string;

  /**
   * Student document number
   */
  @IsString()
  @IsNotEmpty()
  tin: string;

  @IsString()
  @IsOptional()
  @IsEnum(DocumentType, { message: 'Document type must be a valid enum value' })
  document_type?: DocumentType;

  @IsString()
  @IsOptional()
  external_id?: string;

  @IsOptional()
  metadata: T;

  @IsBoolean()
  preloaded: boolean = false;

  /**
   * Program ID to be related to the Student
   */
  @IsString()
  @IsNotEmpty()
  programID: string;

  @IsString()
  @IsOptional()
  inscriptionID?: string;

  @IsString()
  @IsOptional()
  membershipID?: string;

  @IsString()
  @IsOptional()
  complementID?: string;

  @IsString()
  @IsOptional()
  scholarshipID?: string;

  @IsString()
  @IsOptional()
  discountID?: string;

  @IsString()
  @IsOptional()
  surchargeID?: string;
}

export class StudentCreateRS<T = any> extends Student<T> {}
