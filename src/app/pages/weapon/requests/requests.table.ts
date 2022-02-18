import { TableState } from 'src/app/store/models/table.state';

const requestForWeaponTable: TableState = {
  pageNumber: 0,
  pageSize: 10,
  totalItems: 0,
};

const requestForReturningWeaponTable: TableState = {
  pageNumber: 0,
  pageSize: 10,
  totalItems: 0,
};

export default { requestForWeaponTable, requestForReturningWeaponTable };
