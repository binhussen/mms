import {createReducer, on} from "@ngrx/store";
import globalActions from "../actions/global.actions";
import {GlobalState} from "../models/global.state";

export const initialState: GlobalState = {
  error: null,
  message: null,
  loading: false
}

export const globalReducer = createReducer(
  initialState,
  on(globalActions.setLoading, (state: GlobalState, {value}) => ({...state, loading: value})),
  on(globalActions.setError, (state: GlobalState, {value}) => ({...state, error: value})),
  on(globalActions.setMessage, (state: GlobalState, {value}) => ({...state, message: value}))
);
