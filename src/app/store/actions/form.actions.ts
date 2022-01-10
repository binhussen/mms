import {createAction, props} from "@ngrx/store";
import {FormState} from "../models/form.state";

const setSubmittingForm = createAction(
  '[Form] submit form',
  props<{value: Omit<FormState, "response">}>()
)

const setResponseForm = createAction(
  '[Form] submit'
)
