import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Form } from 'src/app/mms-common/models/form';
import { Action } from 'src/app/mms-common/organisms/table/table.component';
import tableActions from 'src/app/store/actions/table.actions';
import { AppState } from 'src/app/store/models/app.state';
import damagesForm from '../damages.form';
import damagesItemsTableState from './damagesTable.table';

@Component({
  selector: 'app-damage-detail',
  templateUrl: './damage-detail.component.html',
  styleUrls: ['./damage-detail.component.scss']
})
export class DamageDetailComponent implements OnInit {

  form: Form = damagesForm.damagesItemForm;
  dataSourceUrl = 'http://localhost:3000/damagesItems';
  actions: Array<Action> = [
    { name: 'Expand', type: 'expand', path: 'damages' },
    { name: 'Edit', type: 'edit' },
  ];
  table = damagesItemsTableState;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store$: Store<AppState>
  ) {
    this.dataSourceUrl =
      this.dataSourceUrl +
      '?damagesId=' +
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
  ngOnInit(): void {
  }

}
