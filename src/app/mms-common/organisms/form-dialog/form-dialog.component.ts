import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Form } from '../../models/form';
import { CrudHttpService } from './crudHttp.service';
import formActions from '../../../store/actions/form.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/models/app.state';
export type ActionType = 'create' | 'update' | 'delete' | 'expand' | null;
interface FormProps {
  form: Form;
  actionTitle: string;
  dataSourceUrl: string;
  actionType: ActionType;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  form!: Form;
  actionTitle = 'save';
  dataSourceUrl!: string;
  actionType!: ActionType;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: FormProps,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    const { form, actionTitle, dataSourceUrl, actionType } = this.inputData;
    this.form = form;
    this.actionTitle = actionTitle;
    this.dataSourceUrl = dataSourceUrl;
    this.actionType = actionType;
  }
  onSubmit(formData: any) {
    console.log(formData);

    const f = {
      value: {
        id: this.form.title,
        data: formData,
        submittedToUrl: this.dataSourceUrl,
        action: this.actionType,
      },
    };
    this.store$.dispatch(formActions.setSubmittingForm(f));
  }
}
