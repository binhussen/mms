export interface Validation {
  type:
    | 'required'
    | 'minLength'
    | 'maxLength'
    | 'max'
    | 'min'
    | 'email'
    | 'phone'
    | 'file';
  value: any;
}
export interface FormElement {
  name: string;
  type:
    | 'text'
    | 'select'
    | 'date'
    | 'checkbox'
    | 'radio'
    | 'email'
    | 'number'
    | 'password'
    | 'file'
    | 'formArray'
    | 'hidden';
  placeholder: string;
  defaultValue: any;
  refer?: string;
  size?: number;
  computeValueFrom?: {
    elements: Array<string>;
    operator: '+' | '-' | '*' | '/';
  };
  options?: Array<Option>;
  validations?: Array<Validation>;
  formArrayItems?: Array<FormElement>;
}
export interface Option {
  value: string;
  label: string;
  referredValue?: string;
}
export interface Form {
  title: string;
  elements: Array<FormElement>;
}
