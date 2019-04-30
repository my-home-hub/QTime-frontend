export interface Declaration {
  id: number;
  costs: number;
  description: string;
  date: Date;
  approvedLocal: boolean;
  approvedGlobal: boolean;
  employee: string;
  instanceId: string;
  imageId: number;
}
