import { ActionType } from 'src/app/mms-common/organisms/table/table.component';

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
