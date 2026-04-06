import { LedgerPayType, LedgerPrimaryConceptType } from './matilda-api-ledger.enums';

export class LedgerItemRQ<T = any> {
  amount: number;
  pay_date: string;
  external_id?: string;
  metadata?: T | string;
}

export class LedgerDiscountItemRQ<T = any> {
  amount: number;
  pay_type: LedgerPayType;
  pay_date: string;
  on_inscription: boolean;
  on_memberships: boolean;
  external_id?: string;
  metadata?: T | string;
}

export class LedgerScholarshipItemRQ<T = any> {
  amount: number;
  pay_type: LedgerPayType;
  pay_date: string;
  on_inscription: boolean;
  on_memberships: boolean;
  external_id?: string;
  metadata?: T | string;
}

export class LedgerCreateRQ<T = any> {
  program_id: string;
  student_id: string;
  primary_concept_type: LedgerPrimaryConceptType;
  primary_concept_id?: string;
  items: LedgerItemRQ<T>[];
  scholarship_id?: string;
  scholarship_items?: LedgerScholarshipItemRQ<T>[];
  discount_id?: string;
  discount_items?: LedgerDiscountItemRQ<T>[];
  external_id?: string;
  metadata?: T | string;
}

export class LedgerEntryRS<T = any> {
  id: string;
  concept_type: string;
  status: string;
  date_period: string;
  due_date: string;
  description: string;
  amount: number;
  pending_amount: number;
  external_id?: string;
  external_metadata?: T;
  metadata?: T;
  items?: Record<string, unknown>[];
  student?: Record<string, unknown>;
}

export class LedgerCreateRS<T = any> {
  data: LedgerEntryRS<T>[];
}

export class LedgerRS<T = any> extends LedgerEntryRS<T> {}
