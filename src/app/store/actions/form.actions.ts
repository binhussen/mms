import {createAction, props} from "@ngrx/store";
import {FormState} from "../models/form.state";

const setSubmittingForm = createAction(
  '[Form] submit form',
  props<{value: Partial<FormState>}>()
)

const formSubmittingSuccess = createAction(
  '[Form] form submitting success',
  props<{value: any}>()
);

const formSubmittingFailure = createAction(
  '[Form] form submitting failure',
  props<{value: any}>()
);

export default { setSubmittingForm, formSubmittingSuccess, formSubmittingFailure };
