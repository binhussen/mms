import { createAction, props } from '@ngrx/store';
import { TableState } from '../models/table.state';

const setTableState = createAction(
  '[Table] set table state',
  props<{ value: Partial<TableState> }>()
);

const updateTableState = createAction(
  '[Table] update table state',
  props<{ value: Partial<TableState> }>()
);

const updatePageNumber = createAction(
  '[Table] update page number',
  props<{ value: { pageNumber: number; pageSize: number; getPath: string } }>()
);

const addData = createAction(
  '[Table] add data',
  props<{ value: { data: any[]; totalItems: number } }>()
);

const addRow = createAction('[Table] add row', props<{ value: any }>());
export default {
  setTableState,
  updateTableState,
  updatePageNumber,
  addData,
  addRow,
};
