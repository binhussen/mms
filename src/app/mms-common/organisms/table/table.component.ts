import {
  AfterViewInit,
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

  constructor(public dialog: MatDialog, private httpClient: HttpClient) {}

  async ngOnInit() {
    this.loading = true;
    await this.getData('0', this.pageSize.toString());
  }
  openDialog(
    actionTitle: string,
    form: Form,
    dataSourceUrl: string,
    actionType: 'create' | 'expand' | 'edit' | 'delete'
  ) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '75%',
      maxWidth: '100vw',
      disableClose: true,
      data: {
        actionTitle: actionTitle,
        form: form,
        dataSourceUrl: dataSourceUrl,
        actionType: actionType,
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      // await this.getData('0', this.pageSize.toString());
      console.log(result);
    });
  }
  command(actionType: 'create' | 'expand' | 'edit' | 'delete', row: any) {
    // TODO: pass the command to parent template or page
    console.log(actionType, row);
    if (actionType === 'edit') {
      const tempForm = { ...this.form };
      tempForm.elements = this.form.elements.map((element) => {
        element.defaultValue = row[element.name];
        return element;
      });
      this.openDialog(
        'Update',
        tempForm,
        `${this.dataSourceUrl}/${row['id']}`,
        actionType
      );
    }

    if (actionType === 'create') {
      const tempForm = { ...this.form };
      this.openDialog('Create', tempForm, this.dataSourceUrl, actionType);
    }
  }

  getColumns(
    data: Array<any>,
    excluded: Array<string> = ['created_at', 'updated_at'],
    actionsAvailable: boolean
  ) {
    let columns = data
      .reduce((c, r) => {
        return [...c, ...Object.keys(r)];
      }, [])
      .reduce((cs: any, c: any) => {
        return cs.includes(c) ? cs : [...cs, c];
      }, [])
      .filter((c: any) => !excluded.includes(c));
    columns = ['No', ...columns, ' '];
    // Describe the columns for <mat-table>.
    this.columns = columns.map((column: any, index: number) => {
      return {
        columnDef: column,
        header: column.replace(/([^A-Z])([A-Z])/g, '$1 $2'),
        cell: (element: any) =>
          `${
            column === 'No'
              ? ''
              : element && element[column]
              ? element[column]
              : ``
          }`,
      };
    });
    this.displayedColumns = this.columns.map((c) => c.columnDef);
  }

  async getData(page: string, limit: string, currentSize?: number) {
    let params = new HttpParams();
    params = params.set('_page', page);
    params = params.set('_limit', limit);
    this.httpClient
      .get<Array<any>>(`${this.dataSourceUrl}?${params.toString()}`, {
        observe: 'response',
      })
      .toPromise()
      .then((data) => {
        if (!currentSize) {
          this.data = data.body ?? [];
          this.getColumns(this.data, this.excludedColumns, true);
        }
        if (currentSize) {
          const temp = data.body ?? [];
          this.data.length = currentSize;
          this.data.push(...temp);
        }
        this.data.length = Number(data.headers.get('X-Total-Count') ?? 20);
        this.dataSource = new MatTableDataSource<any>(this.data);
        this.dataSource._updateChangeSubscription();
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      });
  }

  async pageChange(value: any) {
    const _page = value.pageIndex;
    const _limit = value.pageSize;
    let previousSize = _page * _limit;
    await this.getData(_page + 1, _limit, previousSize);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
