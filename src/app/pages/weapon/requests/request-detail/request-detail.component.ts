import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Form } from 'src/app/mms-common/models/form';
import { Action } from 'src/app/mms-common/organisms/table/table.component';
import tableActions from 'src/app/store/actions/table.actions';
import { AppState } from 'src/app/store/models/app.state';
import requestForm from '../request.form';
import requestItemsTableState from './request.table';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss'],
})
export class RequestDetailComponent implements OnInit {
  form: Form = requestForm.requestItemForWeaponForm;
  dataSourceUrl = 'http://localhost:3000/requestItems';
  actions: Array<Action> = [
    { name: 'Expand', type: 'expand', path: 'notifies' },
    { name: 'Edit', type: 'edit' },
  ];
  table = requestItemsTableState;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store$: Store<AppState>
  ) {
    this.dataSourceUrl =
      this.dataSourceUrl +
      '?requestsId=' +
      this.activatedRoute.snapshot.params.id;
    if (this.table.links) {
      this.table = {
        ...this.table,
        links: { ...this.table.links, getPath: this.dataSourceUrl },
      };
    }

    if (this.table.childOf) {
      const temp: any = {};
      temp[Object.keys(this.table.childOf)[0]] =
        this.activatedRoute.snapshot.params.id;

      this.table = { ...this.table, childOf: this.table.childOf };
    }
    this.store$.dispatch(tableActions.setTableState({ value: this.table }));
  }

  ngOnInit(): void {}
}
