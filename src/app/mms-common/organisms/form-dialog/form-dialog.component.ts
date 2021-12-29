import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Form } from '../../models/form';
import { CrudHttpService } from './crudHttp.service';
interface FormProps {
  form: Form;
  actionTitle: string;
  dataSourceUrl: string;
  actionType: 'create' | 'update' | 'delete' | 'expand';
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
  actionType!: string;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: FormProps,
    private crudService: CrudHttpService
  ) {}

  ngOnInit(): void {
    const { form, actionTitle, dataSourceUrl, actionType } = this.inputData;
    this.form = form;
    this.actionTitle = actionTitle;
    this.dataSourceUrl = dataSourceUrl;
    this.actionType = actionType;
  }
  onSubmit(value: any) {
    console.log(value);
    if (this.actionType === 'create') {
      this.crudService.createOne(value, this.dataSourceUrl).subscribe((r) => {
        this.dialogRef.close({
          message: 'Successfully created!',
          success: true,
        });
      });
    }

    if (this.actionType === 'edit') {
      this.crudService.updateOne(value, this.dataSourceUrl).subscribe((r) => {
        this.dialogRef.close({
          message: 'Successfully Updated!',
          success: true,
        });
      });
    }
  }
}
