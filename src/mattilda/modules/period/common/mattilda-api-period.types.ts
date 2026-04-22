export class PeriodSearch {
  name?: string;
  date_from?: string;
  date_to?: string;
  page?: number;
  status?: string;
  external_id?: string;
  metadata?: string;
}

export class PeriodRS {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: string;
  is_default: boolean;
  parent_id: string | null;
  campus_id: string;
}
