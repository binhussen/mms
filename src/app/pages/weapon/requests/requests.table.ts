import { Action } from 'src/app/mms-common/organisms/table/table.component';
import { TableState } from 'src/app/store/models/table.state';

const baseApiUrl = 'http://localhost:3000';
const dataSourceUrl = `${baseApiUrl}/requests`;
const actions: Array<Action> = [
  { name: 'Expand', type: 'expand', path: 'requests' },
  { name: 'Edit', type: 'edit' },
];

const requestForWeaponTable: TableState = {
  id: 'request table',
  title: 'List of weapons that have been requested',
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
      type: 'requestItems',
      links: {
        getPath: `${baseApiUrl}/requestItems?requestsId=[id]`,
        createPath: `${baseApiUrl}/requestItems`,
        updatePath: `${baseApiUrl}/requestItems/[id]`,
        deletePath: `${baseApiUrl}/requestItems/[id]`,
      },
      relationType: 'many',
    },
  ],
};

const requestForReturningWeaponTable: TableState = {
  pageNumber: 0,
  pageSize: 10,
  totalItems: 0,
};

export default { requestForWeaponTable, requestForReturningWeaponTable };
