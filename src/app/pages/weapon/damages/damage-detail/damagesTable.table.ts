import { Action } from "src/app/mms-common/organisms/table/table.component";
import { TableState } from "src/app/store/models/table.state";

const baseApiUrl = 'http://localhost:3000';
const dataSourceUrl = `${baseApiUrl}/damagesItems`;
const actions: Array<Action> = [{ name: 'Edit', type: 'edit' }];

const damagesItemsTableState: TableState = {
  id: 'damages items table',
  pageNumber: 0,
  pageSize: 5,
  totalItems: 0,
  data: [],
  excludedColumns: ['id', 'damagesId'],
  links: {
    getPath: dataSourceUrl,
    createPath: `${dataSourceUrl}`,
    updatePath: `${dataSourceUrl}/[id]`,
    deletePath: `${dataSourceUrl}/[id]`,
  },
  actions,
  relations: [],
  childOf: {
    damagesId: 0,
  },
};
export default damagesItemsTableState