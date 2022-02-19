import { Action } from 'src/app/mms-common/organisms/table/table.component';
import { TableState } from 'src/app/store/models/table.state';

const baseApiUrl = 'http://localhost:3000';
const dataSourceUrl = `${baseApiUrl}/requestItems`;
const actions: Array<Action> = [
  { name: 'Expand', type: 'expand', path: 'requestItems' },
  { name: 'Edit', type: 'edit' },
];

const requestItemsTableState: TableState = {
  id: 'request items table',
  pageNumber: 0,
  pageSize: 5,
  totalItems: 0,
  data: [],
  excludedColumns: ['id', 'requestsId'],
  links: {
    getPath: dataSourceUrl,
    createPath: `${dataSourceUrl}`,
    updatePath: `${dataSourceUrl}/[id]`,
    deletePath: `${dataSourceUrl}/[id]`,
  },
  actions,
  relations: [],
  childOf: {
    requestItems: 0,
  },
};
export default requestItemsTableState;
