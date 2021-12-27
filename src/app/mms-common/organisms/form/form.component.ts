import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorHandler } from '../../services/error.handler';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  Form as FormBase,
  FormElement,
  Validation,
  Option,
} from '../../models/form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input()
  form!: FormBase;
  @Input()
  actionTitle = 'save';
  @Input()
  asDialog = false;

  mmsForm!: FormGroup;
  errors: any = {};
  data: any = {};
  constructor(private fb: FormBuilder, private errorHandler: ErrorHandler) {}

  // TODO: file input, checkbox
  // TODO: get form info from url,
  // TODO: populate fields from data
  // TODO: submit the form?

  ngOnInit(): void {
    this.actionTitle =
      this.actionTitle[0].toUpperCase() + this.actionTitle.substring(1);
    this.initForm();
    this.errorHandler.handleErrors(this.mmsForm, this.errors);
  }

  initForm() {
    this.mmsForm = this.getNewFormGroup(this.form.elements);
  }

  dateChanged(e: any, control: string) {}

  submit() {
    if (this.mmsForm.invalid) {
      this.mmsForm.markAllAsTouched();
      return;
    }
    console.log(this.mmsForm.value);
  }

  filterByValue(
    formElement: FormElement,
    formArray?: string,
    index?: string
  ): Observable<Array<Option>> {
    const formControl = this.mmsForm.get(
      `${formArray}.${index}.${formElement.name}` ?? ''
    );
    const pathOfRefer = formArray
      ? `${formArray}.${index || '0'}.${formElement.refer}`
      : formElement.refer;
    const elementPath = formArray
      ? `${formArray}.${index || '0'}.${formElement.name}`
      : formElement.name;
    const result =
      pathOfRefer && this.mmsForm.get(pathOfRefer)
        ? this.mmsForm.get(pathOfRefer)?.valueChanges.pipe(
            map((value) => {
              const d = formElement.options?.filter(
                (opt) => opt.referredValue == value
              );
              return d ? d : [];
            }),
            tap((value) => {
              // this.data[elementPath] = value;
              this.data[formElement.name] = value;
              console.log(this.data);
            })
          )
        : of(formElement.options ?? []);

    return result ?? of(formElement.options ?? []);
  }

  getValidator(validations?: Array<Validation>) {
    let temp: any = [];
    if (validations) {
      for (let validation of validations) {
        switch (validation.type) {
          case 'required':
            temp = [...temp, Validators.required];
            break;
          case 'maxLength':
            temp = [...temp, Validators.maxLength(validation.value)];
            break;
          case 'minLength':
            temp = [...temp, Validators.minLength(validation.value)];
            break;
          case 'email':
            temp = [...temp, Validators.email];
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

  getNewFormGroup(elements: Array<FormElement>): FormGroup {
    const temp: any = {};
    // AbstractControl base -> FormGroup / FormControl / FormArray
    elements.forEach((element) => {
      if (!element.formArrayItems) {
        temp[element.name] = [
          element.defaultValue,
          this.getValidator(element.validations),
        ];
      } else {
        temp[element.name] = this.getNewFormArray(element.formArrayItems);
      }
    });
    return this.fb.group(temp);
  }

  getNewFormArray(elements: Array<FormElement>): FormArray {
    const item = this.getNewFormItem(elements);
    return this.fb.array([item]);
  }

  getNewFormItem(elements: Array<FormElement>): FormGroup | FormControl {
    if (elements.length > 1) {
      return this.getNewFormGroup(elements);
    }
    return this.fb.control(
      elements[0].defaultValue,
      this.getValidator(elements[0].validations)
    );
  }

  addFormItemToFromArray(
    event: any,
    path: string,
    elements: Array<FormElement>
  ) {
    event.preventDefault();
    const formArray = this.mmsForm.get(path) as FormArray;
    const newItem = this.getNewFormItem(elements);
    formArray.push(newItem);
  }
  removeFormItemFromFormArray(event: any, path: string, index: number) {
    event.preventDefault();
    const formArray = this.mmsForm.get(path) as FormArray;
    formArray.removeAt(index);
  }
  getFormArrayItems(path: string) {
    return (this.mmsForm.get(path) as FormArray).controls;
  }
  setFileControl(results: Array<string>, controlName: string) {
    const fileControl = this.mmsForm.get(controlName) as FormControl;
    fileControl.patchValue(results.join(','));
  }
}
