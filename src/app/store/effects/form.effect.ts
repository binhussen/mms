import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import formActions from '../actions/form.actions';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { CrudHttpService } from '../crud-http.service';
import { FormData, FormState } from '../models/form.state';
import { of } from 'rxjs';
import tableActions from '../actions/table.actions';

@Injectable()
export class FormEffect {
  $submitForm = createEffect(() =>
    this.actions$.pipe(
      ofType(formActions.setSubmittingForm.type),
      switchMap((action: { value: Omit<FormState, 'response'> }) =>
        this.crudHttpService.manageFormSubmission().pipe(
          mergeMap((response) => [
            formActions.formSubmittingSuccess({ value: response }),
            tableActions.addRow({ value: response[0] }),
          ]),
          catchError((error) =>
            of(formActions.formSubmittingFailure({ value: error }))
          )
        )
      )
    )
  );

  $fechDataFromRelations = createEffect(() =>
    this.actions$.pipe(
      ofType(formActions.setUpdatingForm.type),
      switchMap((action: { value: FormData }) =>
        this.crudHttpService.fetchDataFromRelations(action.value).pipe(
          map((response) =>
            formActions.setUpdatingFormWithRelations({ value: response })
          ),
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
