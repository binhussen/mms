import {createReducer} from "@ngrx/store";
import {FormState} from "../models/form.state";
export const initialState: FormState = {
  id: null,
  data: null,
  response: null,
  status: null,
  submittedToUrl: null
}
export const formReducer = createReducer(initialState);
