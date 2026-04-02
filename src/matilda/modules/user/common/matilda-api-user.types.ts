import { DocumentType, UserStatus, UserType } from './matilda-api-user.enums';

export class User<T = any> {
  name: string;
  first_last_name: string;
  second_last_name: string;
  tin: string;
  document_type: DocumentType | string;
  external_id: string;
  metadata: T | null;
}

export class UserCreateRQ<T = any> extends User<T> {
  email: string;
  phone: string;
}

export interface TaxData {
  [key: string]: unknown;
}

export class UserCreateRS<T = any> extends User<T> {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  username: string;
  email: string;
  status: UserStatus;
  type: UserType;
  phone: string;
  last_login: string;
  is_on_boarding: boolean;
  tax_data: TaxData[];
}
