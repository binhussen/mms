import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Form } from 'src/app/mms-common/models/form';
import { Action } from 'src/app/mms-common/organisms/table/table.component';
import tableActions from 'src/app/store/actions/table.actions';
import { AppState } from 'src/app/store/models/app.state';
import requestForm from './request.form';
import requestsTable from './requests.table';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  form: Form = requestForm.requestForWeaponForm;
  dataSourceUrl = 'http://localhost:3000/notifies';
  actions: Array<Action> = [
    { name: 'Expand', type: 'expand', path: 'requests' },
    { name: 'Edit', type: 'edit' },
  ];

  table = requestsTable.requestForWeaponTable;
  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(tableActions.setTableState({ value: this.table }));
  }
}