import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import tableActions from 'src/app/store/actions/table.actions';
import { AppState } from 'src/app/store/models/app.state';
import requestForWeaponTable from './request-weapon.table';
import requestForms from './request-weapon.form';

@Component({
  selector: 'app-request-weapon',
  templateUrl: './request-weapon.component.html',
  styleUrls: ['./request-weapon.component.scss'],
})
export class RequestWeaponComponent implements OnInit {
  title = 'Request Weapon';
  table = requestForWeaponTable;
  form = requestForms.requestForWeaponForm;
  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(tableActions.setTableState({ value: this.table }));
  }
}
