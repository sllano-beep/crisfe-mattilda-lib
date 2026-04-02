export class MatildaApiModuleOptions {
  apiKey: string;
  domain: string;
  campusId: string;
}

export class MatildaApiErrorRS {
  id?: number;
  mensaje?: string;
  errors?: string[];
}

export class MatildaApiPagedRS<T> {
  items: number;
  page: number;
  total_pages: number;
  data: T[];
}
