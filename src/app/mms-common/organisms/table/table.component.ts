import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Form, FormComponent} from "../form/form.component";
import {FormDialogComponent} from "../form-dialog/form-dialog.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  data!: Array<any>; // or url
  displayedColumns!: Array<any>;
  columns!: Array<any>;
  filters = []; // TODO
  pageSize = 10;
  isColumnClickable: boolean = true;
  routeForDetailPage!: string;
  dataSource = new MatTableDataSource<any>(this.data);
  dataSourceUrl = "http://localhost:3000/elements";
  loading = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // /posts
  // /posts?author=""
  //

  form: Form = {
    title: "User Registration",
    elements: [
      {
        name: "firstName",
        type: "text",
        placeholder: "First Name",
        size: 6,
        defaultValue: "",
        validations: [
          { type: "required", value: true },
          { type: "max", value: 30},
          { type: "min", value: 2}
        ]
      },
      {
        name: "lastName",
        type: "text",
        size: 6,
        placeholder: "Last Name",
        defaultValue: ""
      },
      {
        name: "dob",
        type: "date",
        placeholder: "Birthdate",
        defaultValue: ""
      },
      {
        name: "country",
        type: "select",
        placeholder: "Country",
        defaultValue: "",
        options: [
          {value: "Ethiopia", label: "Ethiopian"},
          {value: "Sudan", label: "Sundanese"}
        ]
      },
      {
        name: 'city',
        type: "select",
        placeholder: "City",
        defaultValue: "",
        refer: "country",
        options: [
          {value: "Addis Ababa", label: "Addis Ababa", referredValue: "Ethiopia"},
          {value: "Jimma", label: "Jimma", referredValue: "Ethiopia"},
          {value: "Khartum", label: "Khartum", referredValue: "Sudan"},
        ]
      },
      {
        name: "gender",
        type: "radio",
        placeholder: "Gender",
        defaultValue: "",
        options: [
          {value: "male", label: "Male"},
          {value: "female", label: "Female"}
        ]
      },
      {
        name: 'profile_picture',
        type: "file",
        placeholder: "Profile Photo",
        defaultValue: "",
      }
    ]
  }
  constructor(public dialog: MatDialog, private httpClient: HttpClient) {
    // TODO: pagination
    // TODO: dataSourceUrl
   // console.log(JSON.stringify(this.data));
  }

  async ngOnInit() {
    this.loading = true;
   await this.getData('0', '5');
  }
  openDialog() {
    const dialogRef = this.dialog.open(
      FormDialogComponent,
      {
        width: '75%',
        maxWidth: '100vw',
        disableClose: true,
        data: {actionTitle: "Create", form: this.form }
      }
    );

  }

  getColumns(data: Array<any>, excluded: Array<string>, actionsAvailable: boolean) {
    let columns = data
      .reduce((c, r) => {
        return [...c, ...Object.keys(r)]
      }, [])
      .reduce((cs: any, c: any) => {
        return cs.includes(c)
          ? cs
          : [...cs, c]
      }, [])
      .filter((c: any) => !excluded.includes(c))
    columns = ['No', ...columns, ' '];
    // Describe the columns for <mat-table>.
    this.columns = columns.map((column: any, index: number) => {
      console.log(column);
      return {
        columnDef: column,
        header: column.replace(/([^A-Z])([A-Z])/g, '$1 $2'),
        cell: (element: any) => `${column === 'No' ? '' : (element && element[column] ? element[column] : ``)}`,
      }
    })
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }

  async getData(page: string, limit: string, currentSize?: number) {
    let params = new HttpParams();
    params = params.set('_page', page);
    params = params.set('_limit', limit);
    this.httpClient
      .get<Array<any>>(`${this.dataSourceUrl}?${params.toString()}`)
      .toPromise().then((data) => {
      if (!currentSize) {
        this.data = data;
        this.getColumns(this.data, ['created_at', 'updated_at'], true);
      }
      if (currentSize) {
        this.data.length = currentSize;
        this.data.push(...data);
      }
      this.data.length = 20;
      this.dataSource = new MatTableDataSource<any>(this.data);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  async pageChange(value: any) {
    const _page = value.pageIndex;
    const _limit = value.pageSize;

    let previousSize = (_page) * _limit;

    await this.getData(_page + 1, _limit, previousSize);

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
