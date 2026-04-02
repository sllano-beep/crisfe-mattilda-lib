import { StudentStatus, StudentType } from './matilda-api-student.enums';

export class Student<T = any> {
  name: string;
  first_last_name: string;
  second_last_name: string;
  tin: string;
  document_type: DocumentType | string;
  external_id: string;
  metadata: T | null;
}

export class StudentCreateRQ<T = any> extends Student<T> {
  enrollment: number;
  grade: number;
  group: string;
  parent_id: string;
  preloaded: boolean;
  programID: string;
}

export interface StudentConcept {
  [key: string]: unknown;
}

export class StudentFamilyGroupRS {
  student_id: string;
  parent_id: string;
  full_name: string;
  is_principal: boolean;
}

export class StudentCreateRS<T = any> extends Student<T> {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  status: StudentStatus;
  type: StudentType;
  enrollment: string;
  grade: string;
  group: string;
  concepts: StudentConcept[];
  period_id: string;
  family_group: StudentFamilyGroupRS[];
}
