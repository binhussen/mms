import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Form } from '../../models/form';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/models/app.state';
import tableSelectors from 'src/app/store/selectors/table.selectors';
import { TableService } from './table.service';
import { debounce, filter, map, mergeMap, takeLast, tap } from 'rxjs/operators';
import { concat, Observable, of } from 'rxjs';
import { TableState } from 'src/app/store/models/table.state';
import tableActions from 'src/app/store/actions/table.actions';
import formActions from 'src/app/store/actions/form.actions';
export interface Action {
  name: string;
  type: 'expand' | 'edit' | 'delete';
  path?: string; // if expand we redirect the user to detail page. For example: if path = 'post' and item id = 2 => /post/2
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  data!: Array<any>; // or url
  displayedColumns!: Array<any>;
  columns!: Array<any>;
  filters = []; // TODO
  isColumnClickable: boolean = true;
  routeForDetailPage!: string;

  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() form!: Form;
  @Input() dataSourceUrl!: string;
  @Input() actions!: Array<Action>;
  @Input() excludedColumns!: Array<string>;
  pageSize = 5;
  dataSource = new MatTableDataSource<any>(this.data);

  actionTitle = 'Create';

  tableState$!: Observable<TableState>;
  links!: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store$: Store<AppState>,
    public tableService: TableService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.tableState$ = this.store$.select(tableSelectors.getTableState);
    await this.initTable(this.tableState$).toPromise();
  }
  openDialog(
    actionTitle: string,
    form: Form,
    dataSourceUrl: string,
    actionType: 'create' | 'expand' | 'edit' | 'delete',
    row?: any
  ) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: form.elements.length >= 6 ? '95%' : '75%',
      maxWidth: '100vw',
      disableClose: true,
      data: {
        actionTitle: actionTitle,
        form: form,
        dataSourceUrl: dataSourceUrl,
        actionType: actionType,
        row: row,
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      this.store$.dispatch(formActions.clearData());
    });
  }
  command(actionType: 'create' | 'expand' | 'edit' | 'delete', row: any) {
    switch (actionType) {
      case 'create':
        this.openDialog('Create', this.form, this.links.createPath, actionType);
        break;
      case 'expand':
        this.router.navigate([`${this.router.url}/${row['id']}`]);
        break;
      case 'edit':
        // fill the form with the current row
        this.store$.dispatch(formActions.setUpdatingForm({ value: row }));
        this.openDialog(
          'Update',
          this.form,
          this.links.updatePath,
          actionType,
          row
        );
        break;
      case 'delete':
        // delete the row
        break;
      default:
        console.log('unknown action');
    }
  }

  initTable(state$: Observable<TableState>, currentSize?: number) {
    return this.store$.select(tableSelectors.getTableState).pipe(
      filter((state) => Boolean(state?.data && state?.data?.length)),
      tap(({ data, totalItems, excludedColumns, links }) => {
        if (!currentSize && data) {
          this.links = links;
          this.data = [...data];
          this.columns = this.tableService.getColumns(
            this.data,
            excludedColumns ?? []
          );
          this.displayedColumns = this.tableService.getDisplayedColumns(
            this.columns
          );
        }
        if (currentSize && data) {
          this.data.length = currentSize;
          this.data.push(...data);
        }

        // deep copy
        const temp = JSON.parse(JSON.stringify(this.data));
        temp.length = totalItems;
        this.data = temp;

        this.dataSource = new MatTableDataSource<any>(data);
        this.changeDetectorRefs.detectChanges();
        this.dataSource._updateChangeSubscription();
        this.dataSource.paginator = this.paginator;
      })
    );
  }

  async pageChange(value: any) {
    const _page = value.pageIndex;
    const _limit = value.pageSize;
    let previousSize = _page * _limit;

    // update page number and page size
    this.store$.dispatch(
      tableActions.updatePageNumber({
        value: {
          pageNumber: _page,
          pageSize: _limit,
          getPath: this.links.getPath,
        },
      })
    );

    await this.initTable(this.tableState$, previousSize).toPromise();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
