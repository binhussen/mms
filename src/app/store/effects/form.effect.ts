import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import formActions from '../actions/form.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CrudHttpService } from '../crud-http.service';
import { FormState } from '../models/form.state';
import { of } from 'rxjs';

@Injectable()
export class FormEffect {
  $submitForm = createEffect(() =>
    this.actions$.pipe(
      ofType(formActions.setSubmittingForm.type),
      switchMap((action: { value: Omit<FormState, 'response'> }) =>
        action.value.action === 'create'
          ? this.crudHttpService
              .createOne(action.value.data, action.value.submittedToUrl ?? '')
              .pipe(
                map((response) => formActions.formSubmittingSuccess(response)),
                catchError((err) => of(formActions.formSubmittingFailure(err)))
              )
          : this.crudHttpService
              .updateOne(action.value.data, action.value.submittedToUrl ?? '')
              .pipe(
                map((response) => formActions.formSubmittingSuccess(response)),
                catchError((err) => of(formActions.formSubmittingFailure(err)))
              )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private crudHttpService: CrudHttpService
  ) {}
}
