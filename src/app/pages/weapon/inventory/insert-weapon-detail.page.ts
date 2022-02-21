import inventoryForm from './inventory.form';
import inventoryTableState from './inventory.table';

const insertWeaponDetailPage = {
  title: 'Insert Weapon Detail',
  type: 'default page',
  form: inventoryForm.inventoryItemForm,
  table: inventoryTableState.inventoryItemsTableState,
};

export default insertWeaponDetailPage;
