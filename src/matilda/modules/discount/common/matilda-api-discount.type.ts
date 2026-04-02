import { DiscountType } from './matilda-api-discount.enums';

export class CreateDiscountRQ<T = any> {
  name: string;
  workday: boolean;
  apply_to_inscriptions: boolean;
  apply_to_memberships: boolean;
  not_apply_with_scholarship: boolean;
  program_id: string;
  amount: number;
  type: DiscountType;
  max_date: number;
  from_day?: number;
  from_month?: number;
  to_day?: number;
  to_month?: number;
  external_id?: string;
  metadata?: T;
}
