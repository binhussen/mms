import { createReducer, on } from '@ngrx/store';
import tableActions from '../actions/table.actions';
import { TableState } from '../models/table.state';

const initialState: TableState = {
  pageNumber: 0,
  pageSize: 5,
  totalItems: 0,
};

export const tableReducer = createReducer(
  initialState,
  on(tableActions.setTableState, (state, { value }) => ({
    ...state,
    ...value,
  })),
  on(tableActions.updateTableState, (state, { value }) => ({
    ...state,
    ...value,
  })),
  on(tableActions.updatePageNumber, (state, { value }) => ({
    ...state,
    pageNumber: value.pageNumber,
    pageSize: value.pageSize,
  })),
  on(tableActions.addData, (state, { value }) => ({ ...state, ...value })),
  on(tableActions.addRow, (state, { value }) => ({
    ...state,
    data: value ? [...(state?.data ?? []), value] : state.data,
  }))
);
