import { createReducer, on } from '@ngrx/store';
import { FormState } from '../models/form.state';
import formActions from '../actions/form.actions';
export const initialState: FormState = {
  id: null,
  data: null,
  response: null,
  updating: null,
  status: null,
  action: null,
  submittedToUrl: null,
};
export const formReducer = createReducer(
  initialState,
  on(formActions.setSubmittingForm, (state, { value }) => ({
    ...state,
    ...value,
    status: 'PENDING',
  })),
  on(formActions.formSubmittingSuccess, (state, { value }) => ({
    ...state,
    response: value,
    status: 'SUCCESS',
  })),
  on(formActions.formSubmittingFailure, (state, { value }) => ({
    ...state,
    response: value,
    status: 'FAILED',
  })),
  on(formActions.setUpdatingForm, (state, { value }) => ({
    ...state,
    updating: value,
  })),
  on(formActions.setUpdatingFormWithRelations, (state, { value }) => ({
    ...state,
    updating: value,
  })),
  on(formActions.clearData, (state) => ({
    ...state,
    ...initialState,
  }))
);
