import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TableService } from 'src/app/mms-common/organisms/table/table.service';
import tableActions from '../actions/table.actions';
import { TableState } from '../models/table.state';

@Injectable()
export class TableEffect {
  $setTableState = createEffect(() =>
    this.actions$.pipe(
      ofType(tableActions.setTableState.type),
      switchMap((action: { value: Partial<TableState> }) =>
        this.tableService
          .fetchData(
            action.value.pageNumber ?? 0,
            action.value.pageSize ?? 5,
            action.value.links?.getPath ?? ''
          )
          .pipe(
            map((response) =>
              tableActions.updateTableState({
                value: { data: response.data, totalItems: response.count },
              })
            )
          )
      )
    )
  );

  $paginate = createEffect(() =>
    this.actions$.pipe(
      ofType(tableActions.updatePageNumber.type),
      switchMap(
        (action: {
          value: { pageNumber: number; pageSize: number; getPath: string };
        }) =>
          this.tableService
            .fetchData(
              action.value.pageNumber + 1,
              action.value.pageSize,
              action.value.getPath
            )
            .pipe(
              map((response) =>
                tableActions.addData({
                  value: { data: response.data, totalItems: response.count },
                })
              )
            )
      )
    )
  );

  constructor(private actions$: Actions, private tableService: TableService) {}
}
