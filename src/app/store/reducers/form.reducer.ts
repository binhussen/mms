import {createReducer, on} from "@ngrx/store";
import {FormState} from "../models/form.state";
import formActions from "../actions/form.actions";
export const initialState: FormState = {
  id: null,
  data: null,
  response: null,
  status: null,
  action: null,
  submittedToUrl: null
}
export const formReducer = createReducer(initialState,
  on(formActions.setSubmittingForm, (state, {value}) => ({...state, ...value, status: 'PENDING'})),
  on(formActions.formSubmittingSuccess, (state, {value}) => ({...state, response: value, status: "SUCCESS"})),
  on(formActions.formSubmittingFailure, (state, {value}) => ({...state, response: value, status: "FAILED"}))
);
