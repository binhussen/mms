import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { concat, zip } from 'rxjs';
import { concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { Action } from 'src/app/mms-common/organisms/table/table.component';
import formActions from 'src/app/store/actions/form.actions';
import { AppState } from 'src/app/store/models/app.state';
import { DialogComponent } from './dialog/dialog.component';

interface MatTableColumn {
  columnDef: string;
  header: string;
  cell: (element: any) => string;
}

@Component({
  selector: 'app-distribute',
  templateUrl: './distribute.component.html',
  styleUrls: ['./distribute.component.scss'],
})
export class DistributeComponent implements OnInit {
  tables: any = {
    requests: {
      title: 'List Of Approved Weapon Requests',
      dataSource: [],
      actions: [{ name: 'Distribute', type: 'create' }],
      columns: [],
      excludedColumns: ['id', 'requestWeaponApprovals', 'requestWeaponItems'],
      getDisplayedColumns: (columns: Array<MatTableColumn>) =>
        columns.map((c) => c.columnDef),
    },
    distributes: {},
  };
  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private store$: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.getApprovedRequests().subscribe((data) => {
      this.tables.requests.dataSource = data;
      this.tables.requests.columns = this.getColumns(
        data,
        this.tables.requests.excludedColumns
      );
    });
    this.getDistributedWeapons();
  }

  getDistributedWeapons() {
    this.httpClient
      .get<Array<any>>('http://localhost:3000/distributedWeapons')
      .subscribe((data) => {
        console.log(data);
      });
  }

  getApprovedRequests() {
    return this.httpClient
      .get<Array<any>>(
        'http://localhost:3000/requestWeapons/?requestStatus=APPROVED'
      )
      .pipe(
        mergeMap((data) => {
          return zip(
            ...data.map((item) => {
              return this.httpClient
                .get<Array<any>>(
                  `http://localhost:3000/requestWeaponApprovals/?requestWeaponsId=${item.id}`
                )
                .pipe(
                  mergeMap((response) =>
                    this.httpClient
                      .get<Array<any>>(
                        `http://localhost:3000/requestWeaponItems/?requestWeaponsId=${item.id}`
                      )
                      .pipe(
                        map((response2) => ({
                          ...item,
                          requestWeaponApprovals: response,
                          requestWeaponItems: response2,
                        }))
                      )
                  )
                );
            })
          );
        })
      );
  }

  getColumns(
    data: Array<any>,
    excludedColumns: Array<string>
  ): Array<MatTableColumn> {
    // extract columns from data
    let columns = data?.length > 0 ? Object.keys(data[0]) : [];
    if (excludedColumns) {
      columns = columns.filter((c) => !excludedColumns.includes(c));
    }

    // add additional column for actions and position
    columns = ['No', ...columns, ' '];

    // Describe the columns for <mat-table>.
    const c = columns.map((column: any, index: number) => {
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
    return c;
  }

  async command(action: Action, row: any) {
    console.log(action, row);
    const weaponItems = await this.getWeaponItems().toPromise();
    const dialogRef = this.matDialog.open(DialogComponent, {
      width: '75%',
      maxWidth: '100vw',
      disableClose: true,
      data: {
        selectedRow: row,
        weaponItems,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });

    const temp = {
      ...row,
      weaponItems: weaponItems.map((item) => ({
        ...item,
        weaponItemsId: item.id,
      })),
    };
    this.store$.dispatch(
      formActions.setUpdatingFormWithRelations({ value: temp })
    );
  }

  getWeaponItems() {
    return this.httpClient.get<Array<any>>(
      'http://localhost:3000/weaponItems?weaponAvailability=1'
    );
  }
}
