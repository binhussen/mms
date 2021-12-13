import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorHandler} from "../../services/error.handler";
import {map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";

export interface Form {
  title: string;
  elements: Array<FormElement>;
}
export interface Validation {
  type: 'required'
    | 'minLength'
    | 'maxLength'
    | 'max'
    | 'min'
    | 'email'
    | 'phone'
    | 'file';
  value: any;
}
export interface FormElement {
  name: string;
  type: 'text'
    | 'select'
    | 'date'
    | 'checkbox'
    | 'radio'
    | 'email'
    | 'number'
    | 'password' | 'file';
  placeholder: string;
  defaultValue: any;
  refer?: string;
  size?: number;
  options?: Array<Option>;
  validations?: Array<Validation>;
}
export interface Option {
  value: string;
  label: string;
  referredValue?: string;
}


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  // animations: [
  //   trigger('fadeInOut', [
  //     state('in', style({ opacity: 100 })),
  //     transition('* => void', [animate(10000, style({ opacity: 0 }))])
  //   ])
  // ]
})
export class FormComponent implements OnInit {
  @Input()
  form!: Form;
  @Input()
  actionTitle = "save";
  @Input()
  asDialog = false;

  mmsForm!: FormGroup;
  errors: any = {};
  data: any = {};
  constructor(
    private fb: FormBuilder,
    private errorHandler: ErrorHandler) {
  }

  // TODO: file input, checkbox
  // TODO: get form info from url,
  // TODO: populate fields from data
  // TODO: submit the form?

  ngOnInit(): void {
    this.actionTitle = this.actionTitle[0].toUpperCase() + this.actionTitle.substring(1);
    this.initForm();
    this.errorHandler.handleErrors(this.mmsForm, this.errors);
  }

  initForm() {
    this.mmsForm = this.generateForm();
  }

  dateChanged(e: any, control: string) {

  }

  submit() {
    if (this.mmsForm.invalid) {
      this.mmsForm.markAllAsTouched();
      return;
    }
    console.log(this.mmsForm.value);
  }

  filterByValue(formElement: FormElement): Observable<Array<Option>> {
    const result = formElement.refer && this.mmsForm.get(formElement.refer) ?
      this.mmsForm.get(formElement.refer)?.valueChanges
      .pipe(
        map((value) => {
          const d = formElement.options?.filter((opt) => opt.referredValue == value);
          return d ? d : []
        }),
        tap(value => this.data[formElement.name] = value)
      ) : of((formElement.options) ?? []);

    return result ?? of((formElement.options) ?? []);
  }

  getValidator(validations?: Array<Validation>) {
    let temp: any = [];
    if (validations) {
      for(let validation of validations) {
        switch (validation.type) {
          case "required":
            temp = [...temp, Validators.required];
            break;
          case "maxLength":
            temp = [...temp, Validators.maxLength(validation.value)];
            break;
          case "minLength":
            temp = [...temp, Validators.minLength(validation.value)];
            break;
          case "email":
            temp = [...temp, Validators.email]
            break;
        }
      }
    }
    return temp;
  }

  getSizeDefault(size: number | undefined) {
    const s = (size ?? 12) * 8.3333;
    return size ? `0 1 calc(${s}% - 16px)` : `${s}%`;
  }

  generateForm(): FormGroup {
    const form: any = {};
    this.form.elements.forEach((element: FormElement) => {
      form[element.name] = [element.defaultValue, this.getValidator(element.validations)];
    });
    return this.fb.group(form);
  }

  setFileControl(results: Array<string>, controlName: string) {
    const fileControl = this.mmsForm.get(controlName) as FormControl;
    fileControl.patchValue(results.join(","));
  }
}

