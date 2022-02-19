import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Form } from 'src/app/mms-common/models/form';
import { Action } from 'src/app/mms-common/organisms/table/table.component';
import tableActions from 'src/app/store/actions/table.actions';
import { AppState } from 'src/app/store/models/app.state';
import inventoryForm from './inventory.form';
import inventoryTableState from './inventory.table';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  form: Form = inventoryForm.inventoryForm;
  dataSourceUrl = 'http://localhost:3000/weaponInventories';
  actions: Array<Action> = [
    { name: 'Expand', type: 'expand', path: 'inventories' },
    { name: 'Edit', type: 'edit' },
  ];
  table = inventoryTableState;
  constructor(private store$: Store<AppState>) {
    this.store$.dispatch(tableActions.setTableState({ value: this.table }));
  }

  ngOnInit(): void {}
}
