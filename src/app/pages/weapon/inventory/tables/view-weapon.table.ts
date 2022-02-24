import { Action } from 'src/app/mms-common/organisms/table/table.component';
import { TableState } from 'src/app/store/models/table.state';

const baseApiUrl = 'http://localhost:3000';
const dataSourceUrl = `${baseApiUrl}/weaponInventories`;
const actions: Array<Action> = [
  { name: 'Expand', type: 'expand', path: 'inventory' },
  { name: 'Edit', type: 'edit' },
];

const viewWeaponTable: TableState = {
  id: 'View Weapon table',
  title: 'Inventory List',
  pageNumber: 0,
  pageSize: 5,
  totalItems: 0,
  data: [],
  excludedColumns: ['id'],
};

export default viewWeaponTable;
