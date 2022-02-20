import { Action } from 'src/app/mms-common/organisms/table/table.component';
import { TableState } from 'src/app/store/models/table.state';

const baseApiUrl = 'http://localhost:3000';
const dataSourceUrl = `${baseApiUrl}/returns`;
const actions: Array<Action> = [
  { name: 'Expand', type: 'expand', path: 'returns' },
  { name: 'Edit', type: 'edit' },
];

const requestForReturningWeaponTable: TableState = {
  id: 'request table',
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
      type: 'returnItems',
      links: {
        getPath: `${baseApiUrl}/returnItems?returnsId=[id]`,
        createPath: `${baseApiUrl}/returnItems`,
        updatePath: `${baseApiUrl}/returnItems/[id]`,
        deletePath: `${baseApiUrl}/returnItems/[id]`,
      },
      relationType: 'many',
    },
  ],
};

const requestForReturningWeaponItemsTable: TableState = {
  id: 'return items table',
  pageNumber: 0,
  pageSize: 5,
  totalItems: 0,
  data: [],
  excludedColumns: ['id', 'returnWeaponId'],
  links: {
    getPath: `${baseApiUrl}/returnWeaponItems?returnWeaponId=[id]`,
    createPath: `${baseApiUrl}/returnWeaponItems`,
    updatePath: `${baseApiUrl}/returnWeaponItems/[id]`,
    deletePath: `${baseApiUrl}/returnWeaponItems/[id]`,
  },
  actions: actions.slice(1),
  relations: [],
  childOf: {
    returnWeaponId: 0,
  },
};

export default {
  requestForReturningWeaponTable,
  requestForReturningWeaponItemsTable,
};
