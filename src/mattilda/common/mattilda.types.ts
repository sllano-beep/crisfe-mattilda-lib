export class MattildaApiModuleOptions {
  apiKey: string;
  domain: string;
  campusId: string;
}

export class MattildaApiErrorRS {
  id?: number;
  mensaje?: string;
  errors?: string[];
}

export class MattildaApiPagedRS<T> {
  items: number;
  page: number;
  total_pages: number;
  data: T[];
}
