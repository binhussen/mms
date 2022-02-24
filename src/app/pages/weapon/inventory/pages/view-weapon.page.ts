import viewWeaponTable from '../tables/view-weapon.table';

const baseApiUrl = 'http://localhost:3000';
const viewWeaponPage = {
  title: 'View Weapon Inventories',
  link: `${baseApiUrl}/weaponItems`,
  groupBy: 'weaponModel',
  aggregate: 'weaponQuantity',
  table: viewWeaponTable,
};

export default viewWeaponPage;
