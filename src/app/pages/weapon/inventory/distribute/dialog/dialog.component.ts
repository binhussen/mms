import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { concat, Observable, zip } from 'rxjs';
import { catchError, concatAll, mergeMap, tap } from 'rxjs/operators';
import { Form } from 'src/app/mms-common/models/form';
import { FormComponent } from 'src/app/mms-common/organisms/form/form.component';
import { ActionType } from 'src/app/mms-common/organisms/table/table.component';
import distributeForm from '../../forms/distribute.form';

interface Steps {
  isCompleted: boolean;
  submitUrl: string;
  submitFunction: (formData: any) => Observable<any>;
  response: any;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, AfterViewInit {
  actionType: ActionType = 'approve';
  dataSourceUrl = 'http://localhost:3000/requestWeapons';
  userRegistrationForm: Form = distributeForm.userForm;
  distributeForm: Form = distributeForm.distributeForm;

  completed = false;

  step1!: FormGroup;
  step2!: FormGroup;

  isStep1Completed: boolean = false;
  isStep2Completed: boolean = false;

  steps: { [key: string]: Steps } = {
    step1: {
      isCompleted: false,
      submitUrl: 'http://localhost:3000/weaponReceivers',
      submitFunction: this.submitUserRegistrationForm.bind(this),
      response: null,
      // actions: take response and send to server and based on the response show the next step
      //
    },
    step2: {
      isCompleted: false,
      submitUrl: 'http://localhost:3000/distributedWeapons',
      submitFunction: this.submitDistributeForm.bind(this),
      response: null,
      // take response from step1 and send to server and based on that close the dialog
      // and open another dialog with persons Id generated and allow printing
    },
  };

  @ViewChild('userRegistration')
  userRegistrationFormComponent!: FormComponent;

  @ViewChild('distributeFormRegistration')
  distributeFormComponent!: FormComponent;

  @ViewChild('stepper')
  stepper!: MatStepper;

  data: any;

  // distributeFormRegistration

  // Get weaponItems from /weaponItems?available=true,
  // and list of approved items from /requestWeaponApprovals?requestWeaponsId=[id]
  // and /requestApprovedWeaponItems?requestWeaponApprovalsId=[id]
  // and populate it in the distributeForm
  // requestApprovedWeaponItems
  // requestWeaponApprovals

  constructor(
    @Inject(MAT_DIALOG_DATA) public inputData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private http: HttpClient
  ) {
    console.log('inputData', inputData);
    this.data = inputData;
  }
  ngAfterViewInit(): void {
    this.logValues('AfterViewInit');
    if (this.data.weaponItems.length) {
      this.step1 = this.userRegistrationFormComponent.mmsForm;
      this.step2 = this.distributeFormComponent.mmsForm;
    } else {
      setTimeout(() => {
        this.dialogRef.close();
      }, 2000);
    }
  }

  ngOnInit(): void {
    this.logValues('OnInit');
    this.step1 = new FormGroup({});
    this.step2 = new FormGroup({});
    console.log(this.userRegistrationFormComponent);
  }
  onSubmit(formData: any, step: 'step1' | 'step2') {
    console.log(formData);
    this.steps[step].submitFunction(formData).subscribe((response) => {
      console.log(response);
      this.steps[step].response = response;
      this.steps[step].isCompleted = true;
      this.stepper.next();
    });
    //  console.log(formData, userRegistration.valid, stepper.next());
  }
  logValues(eventType: string) {
    console.log(
      `[${eventType}]\n userRegistration: ${this.userRegistrationFormComponent}\n`
    );
  }

  submitUserRegistrationForm(value: any) {
    return this.http.post(this.steps.step1.submitUrl, value);
  }

  submitDistributeForm(value: any) {
    const { weaponItems, ...rest } = value;
    const temp = {
      ...rest,
      weaponReceiversId: this.steps.step1.response.id,
      requestWeaponsId: this.data.selectedRow.id,
      requestWeaponApprovalsId:
        this.data.selectedRow.requestWeaponApprovals[0].id,
    };
    return this.http.post(this.steps.step2.submitUrl, temp).pipe(
      mergeMap((response: any) =>
        this.submitDistributedWeaponItems(response.id, weaponItems)
      ),
      tap(async (response) => {
        await this.updateWeaponItemsAvailability(weaponItems).toPromise();
        await this.updateWeaponRequestStatus(
          this.data.selectedRow.id,
          'DISTRIBUTED'
        ).toPromise();
      })
    );
  }

  submitDistributedWeaponItems(id: number, weaponItems: Array<any>) {
    return concat(
      weaponItems.map((weaponItem) =>
        this.http.post(`http://localhost:3000/distributedWeaponItems`, {
          ...weaponItem,
          distributedWeaponsId: id,
        })
      )
    ).pipe(concatAll());
  }

  updateWeaponItemsAvailability(weaponItems: Array<any>) {
    return concat(
      weaponItems.map((weaponItem) =>
        this.http.patch(`http://localhost:3000/weaponItems/${weaponItem.id}`, {
          weaponAvailability: '0',
        })
      )
    ).pipe(
      concatAll(),
      catchError((error) => {
        console.log(error);
        return error;
      })
    );
  }

  updateWeaponRequestStatus(id: number, status: string) {
    return this.http.patch(`http://localhost:3000/requestWeapons/${id}`, {
      requestStatus: status,
    });
  }
  isCompleted(form: FormGroup) {
    return form ? form.valid : false;
  }
}
