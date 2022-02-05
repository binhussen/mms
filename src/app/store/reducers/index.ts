import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {AppState} from "../models/app.state";
import {globalReducer} from "./global.reducer";
import {environment} from "../../../environments/environment";
import {formReducer} from "./form.reducer";

export const reducers: ActionReducerMap<AppState> = {
  global: globalReducer,
  form: formReducer
}

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
