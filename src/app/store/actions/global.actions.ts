import {createAction, props} from "@ngrx/store";

const setLoading = createAction(
  '[Global] update loading',
  props<{value: boolean}>()
);

const setError = createAction(
  '[Global] update error',
  props<{ value: null | {message: string; statusCode: string;} }>()
);

const setMessage = createAction(
  '[Global] update message',
  props<{ value: null | {message: string; duration: number;}}>()
);


export default {setLoading, setError, setMessage}
