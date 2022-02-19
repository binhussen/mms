import { Action } from 'src/app/mms-common/organisms/table/table.component';
export interface ResourceLinks {
  getPath: string;
  createPath: string;
  updatePath: string;
  deletePath: string;
}
export interface RelationShip {
  type: string;
  links: ResourceLinks;
  relationType: 'one' | 'many';
}

export interface TableState {
  id?: string;
  title?: string;
  data?: any[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  excludedColumns?: string[];
  relations?: RelationShip[];
  links?: ResourceLinks;
  actions?: Action[];
  childOf?: {
    [key: string]: number;
  };
}
