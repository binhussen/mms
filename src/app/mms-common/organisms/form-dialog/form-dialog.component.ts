import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Form} from "../../models/form";
interface FormProps {
  form: Form;
  actionTitle: string;
}
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {
  form!: Form;
  actionTitle = "save";
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: FormProps
  ) { }

  ngOnInit(): void {
    const {form, actionTitle} = this.inputData;
    this.form = form; this.actionTitle = actionTitle;
  }
}
