import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Form } from 'src/app/mms-common/models/form';
import { Action } from 'src/app/mms-common/organisms/table/table.component';
import tableActions from 'src/app/store/actions/table.actions';
import { AppState } from 'src/app/store/models/app.state';
import requestForm from './request.form';
import requestTabs from './request.tabs';
import requestsTable from './requests.table';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  form: Form = requestForm.requestForWeaponForm;
  tabs = requestTabs;
  ngOnInit(): void {}
}
