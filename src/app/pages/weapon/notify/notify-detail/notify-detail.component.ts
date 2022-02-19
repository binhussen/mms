import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Form } from 'src/app/mms-common/models/form';
import { Action } from 'src/app/mms-common/organisms/table/table.component';
import tableActions from 'src/app/store/actions/table.actions';
import { AppState } from 'src/app/store/models/app.state';
import notifyForm from '../notify.form';
import notifyItemsTableState from './notify.table';

@Component({
  selector: 'app-notify-detail',
  templateUrl: './notify-detail.component.html',
  styleUrls: ['./notify-detail.component.scss'],
})
export class NotifyDetailComponent implements OnInit {
  form: Form = notifyForm.notifyItemForm;
  dataSourceUrl = 'http://localhost:3000/notifyItems';
  actions: Array<Action> = [
    { name: 'Expand', type: 'expand', path: 'notifies' },
    { name: 'Edit', type: 'edit' },
  ];
  table = notifyItemsTableState;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store$: Store<AppState>
  ) {
    this.dataSourceUrl =
      this.dataSourceUrl +
      '?notifiesId=' +
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
