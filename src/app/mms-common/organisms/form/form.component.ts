import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorHandler } from '../../services/error.handler';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap,
  skip,
  switchMap,
  takeLast,
  takeUntil,
  takeWhile,
  tap,
  zipAll,
} from 'rxjs/operators';
import {
  combineLatest,
  concat,
  merge,
  Observable,
  of,
  Subscription,
  zip,
} from 'rxjs';
import {
  Form as FormBase,
  FormElement,
  Validation,
  Option,
} from '../../models/form';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/models/app.state';
import formActions from '../../../store/actions/form.actions';
import { HttpClient } from '@angular/common/http';
import { ActionType } from '../table/table.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  @Input()
  form!: FormBase;
  @Input()
  actionTitle = 'save';
  @Input()
  asDialog = false;

  @Input()
  actionType!: ActionType;

  @Input()
  submittedToUrl!: string;

  mmsForm!: FormGroup;
  errors: any = {};
  data: any = {};

  subscriptions: Array<Subscription> = [];

  @Output()
  onFormSubmit = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private errorHandler: ErrorHandler,
    private store$: Store<AppState>
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  // TODO: file input, checkbox
  // TODO: get form info from url,
  // TODO: populate fields from data
  // TODO: submit the form?

  ngOnInit(): void {
    this.actionTitle =
      this.actionTitle[0].toUpperCase() + this.actionTitle.substring(1);
    this.initForm().then(() => {
      this.errorHandler.handleErrors(this.mmsForm, this.errors);
    });
  }

  async initForm() {
    this.mmsForm = this.getNewFormGroup(this.form.elements);
    await this.getForm(this.form.elements).toPromise();
    this.computeValues(this.form.elements);
  }

  getForm(elements: Array<FormElement>) {
    return this.store$
      .select((state) => state.form.updating)
      .pipe(
        takeWhile(
          (value) => this.actionType === 'edit' || this.actionType === 'approve'
        ),
        distinctUntilChanged(),
        tap((updating) => {
          elements.forEach((element) => {
            if (element.type === 'formArray' && updating) {
              const elementPath = this.someInformalShit(
                this.submittedToUrl ?? '',
                element.name
              );
              const items = updating[elementPath]?.map((item: any) =>
                this.getNewFormItem(element.formArrayItems ?? [])
              );
              items?.forEach((control: AbstractControl, index: number) => {
                const elementPath = this.someInformalShit(
                  this.submittedToUrl ?? '',
                  element.name
                );
                if (control instanceof FormGroup) {
                  for (let con in control.controls) {
                    control.controls[con].patchValue(
                      updating[elementPath][index][con] ?? element.defaultValue
                    );
                  }
                }

                if (control instanceof FormControl) {
                  control.patchValue(
                    updating[elementPath][index] ?? element.defaultValue
                  );
                }
              });
              const formArray = this.mmsForm.get(element.name) as FormArray;
              this.mmsForm.setControl(
                element.name,
                items ? this.fb.array(items) : formArray
              );
            } else if (updating) {
              // TODO: change this shitty code
              const elementPath =
                element.name == 'requestWeaponsId' ? 'id' : element.name;
              this.mmsForm
                .get(element.name)
                ?.patchValue(updating[elementPath] ?? element.defaultValue);
            }
          });
        })
      );
  }

  someInformalShit(submittedToUrl: string, elementName: string) {
    console.log(submittedToUrl);
    if (submittedToUrl.includes('requestWeaponApprovals')) {
      return 'requestWeaponItems';
    }

    return elementName;
  }

  dateChanged(e: any, control: string) {}

  submit() {
    if (this.mmsForm.invalid) {
      this.mmsForm.markAllAsTouched();
      return;
    }

    this.onFormSubmit.emit(this.mmsForm.value);
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

  computeValues(elements: Array<FormElement>) {
    elements.forEach((element) => {
      if (element.type === 'formArray') {
        element.formArrayItems?.forEach((item) => {});
        const items = (this.mmsForm.get(element.name) as FormArray).controls;
        items.forEach((control) => {
          if (control instanceof FormGroup) {
            const controls = control.controls;
            for (let con in controls) {
              const tempEl = element.formArrayItems?.find(
                (el) => el.name === con
              );
              if (tempEl && tempEl.computeValueFrom) {
                const sub1 = combineLatest(
                  tempEl.computeValueFrom.elements.map(
                    (el) => controls[el]?.valueChanges
                  )
                ).subscribe((values) => {
                  // @TODO for the time being only multiplication is implemented
                  controls[con].patchValue(
                    values.reduce((ac, cur) => ac * cur, 1),
                    { emitEvent: false }
                  );
                });
                this.subscriptions.push(sub1);
              }
            }
          }
        });
      } else {
        if (element.computeValueFrom) {
          const tempEl = this.mmsForm.get(element.name) as FormControl;
          const sub2 = combineLatest(
            element.computeValueFrom.elements.map(
              (el) => this.mmsForm.get(el)?.valueChanges
            )
          ).subscribe((values) => {
            // @TODO for the time being only multiplication is implemented
            if (values && values.length > 0) {
              tempEl.patchValue(
                values.reduce((ac, cur: any) => ac * cur, 1),
                { emitEvent: false }
              );
            }
          });

          this.subscriptions.push(sub2);
        }
      }
    });
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
    this.computeValues(this.form.elements);
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
