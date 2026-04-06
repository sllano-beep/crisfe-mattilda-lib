export class MatildaApiProgramRS<T = any> {
  programID: string;
  name: string;
  externalId: string;
  campusPeriodId: string;
  metadata: T | null;
}

export class ProgramSearch {
  name?: string;
  date_from?: string;
  date_to?: string;
  page?: number;
  status?: string;
  external_id?: string;
  metadata?: string;
}
