import {GlobalState} from "./global.state";
import {FormState} from "./form.state";

export interface AppState {
  global: GlobalState;
  form: FormState;
}
