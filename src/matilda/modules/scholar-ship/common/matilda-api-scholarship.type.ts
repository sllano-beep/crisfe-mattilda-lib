import { ScholarshipType } from './matilda-api-scholarship.enums';

export class CreateScholarshipRQ<T = any> {
  name: string;
  description: string;
  program_id: string;
  apply_to_inscriptions: boolean;
  apply_to_memberships: boolean;
  amount: number;
  type: ScholarshipType;
  external_id?: string;
  metadata?: T;
}

export class CreateScholarshipRS<T = any> extends CreateScholarshipRQ<T> {
  id: string;
  status: string;
}
