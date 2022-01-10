export interface FormInfo {
  submittedToUrl: string;
}
export interface FormData {
  [key: string]: any;
}
export interface FormState {
  id: string | null;
  status: 'PENDING' | 'FAILED' | 'SUCCESS' | null;
  submittedToUrl: string | null;
  data: any;
  response: any;
}
