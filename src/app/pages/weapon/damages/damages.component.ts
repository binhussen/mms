import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Form } from 'src/app/mms-common/models/form';
import { Action } from 'src/app/mms-common/organisms/table/table.component';
import tableActions from 'src/app/store/actions/table.actions';
import { AppState } from 'src/app/store/models/app.state';
import damagesForm from './damages.form';
import damagesTableState from './damages.table';

@Component({
  selector: 'app-damages',
  templateUrl: './damages.component.html',
  styleUrls: ['./damages.component.scss']
})
export class DamagesComponent implements OnInit {

  form: Form = damagesForm.damagesForm;
  dataSourceUrl = 'http://localhost:3000/notifies';
  actions: Array<Action> = [
    { name: 'Expand', type: 'expand', path: 'notifies' },
    { name: 'Edit', type: 'edit' },
  ];

  table = damagesTableState;
  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(tableActions.setTableState({ value: this.table }));
  }

}
