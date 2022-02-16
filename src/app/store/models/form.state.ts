import { ActionType } from 'src/app/mms-common/organisms/form-dialog/form-dialog.component';

export interface FormInfo {
  submittedToUrl: string;
}
export interface FormData {
  [key: string]: any;
}
export interface FormState {
  id: string | null;
  status: 'PENDING' | 'FAILED' | 'SUCCESS' | null;
  action: ActionType;
  updating: FormData | null;
  submittedToUrl: string | null;
  data: any;
  response: any;
}
