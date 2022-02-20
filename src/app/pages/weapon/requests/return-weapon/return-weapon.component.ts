import { Component, OnInit } from '@angular/core';
import returnWeaponTable from './return-weapon.table';
import returnWeaponForm from './return-weapon.form';
import { AppState } from 'src/app/store/models/app.state';
import { Store } from '@ngrx/store';
import tableActions from 'src/app/store/actions/table.actions';
@Component({
  selector: 'app-return-weapon',
  templateUrl: './return-weapon.component.html',
  styleUrls: ['./return-weapon.component.scss'],
})
export class ReturnWeaponComponent implements OnInit {
  table = returnWeaponTable.requestForReturningWeaponTable;
  form = returnWeaponForm.requestForReturningWeaponForm;
  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(tableActions.setTableState({ value: this.table }));
  }
}
