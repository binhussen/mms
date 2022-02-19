import { Action } from 'src/app/mms-common/organisms/table/table.component';
import { TableState } from 'src/app/store/models/table.state';

const baseApiUrl = 'http://localhost:3000';
const dataSourceUrl = `${baseApiUrl}/damages`;
const actions: Array<Action> = [
  { name: 'Expand', type: 'expand', path: 'damages' },
  { name: 'Edit', type: 'edit' },
];

const notifyTableState: TableState = {
  id: 'damages table',
  pageNumber: 0,
  pageSize: 5,
  totalItems: 0,
  data: [],
  excludedColumns: ['id'],
  links: {
    getPath: dataSourceUrl,
    createPath: `${dataSourceUrl}`,
    updatePath: `${dataSourceUrl}/[id]`,
    deletePath: `${dataSourceUrl}/[id]`,
  },
  actions,
  relations: [
    {
      type: 'damagesItems',
      links: {
        getPath: `${baseApiUrl}/damagesItems?damagesId=[id]`,
        createPath: `${baseApiUrl}/damagesItems`,
        updatePath: `${baseApiUrl}/damagesItems/[id]`,
        deletePath: `${baseApiUrl}/damagesItems/[id]`,
      },
      relationType: 'many',
    },
  ],
};

// set this state to the store
// effect will fetch the data from the api and set it to the store

export default notifyTableState;
