export class MatildaApiProgramRS<T = any> {
    programId: string;
    name: string;
    externalId: string;
    campusPeriodId: string;
    metadata: T | null;
}