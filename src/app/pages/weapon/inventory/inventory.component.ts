import { Component, OnInit } from '@angular/core';
import { Form } from 'src/app/mms-common/models/form';
import { Action } from 'src/app/mms-common/organisms/table/table.component';
import inventoryForm from './inventory.form';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  form: Form = inventoryForm;
  dataSourceUrl = 'http://localhost:3000/weaponInventories';
  actions: Array<Action> = [
    { name: 'Expand', type: 'expand', path: 'notifies' },
    { name: 'Edit', type: 'edit' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
