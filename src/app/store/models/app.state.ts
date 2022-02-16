import { GlobalState } from './global.state';
import { FormState } from './form.state';
import { TableState } from './table.state';

export interface AppState {
  global: GlobalState;
  form: FormState;
  table: TableState;
}
