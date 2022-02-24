import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { distinctUntilChanged, map, mergeMap, tap } from 'rxjs/operators';
import tableActions from 'src/app/store/actions/table.actions';
import { AppState } from 'src/app/store/models/app.state';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  constructor(
    public activatedRoute: ActivatedRoute,
    private store$: Store<AppState>,
    private titleService: Title,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.data
      .pipe(
        distinctUntilChanged(),
        mergeMap((data) => {
          console.log(data);
          this.titleService.setTitle(data.title ?? 'MMS - MMS');
          this.store$.dispatch(
            tableActions.setTableState({ value: data.table })
          );
          if ((data.link, data.groupBy, data.aggregate)) {
            return this.fetchData(data.link, data.groupBy, data.aggregate);
          }
          return of([]);
        }),
        map((data) => {
          this.store$.dispatch(
            tableActions.updateTableState({
              value: { data, totalItems: data.length },
            })
          );
        })
      )
      .subscribe();
  }

  fetchData(url: string, groupBy?: string, aggregate?: string) {
    return this.httpClient.get<Array<any>>(url).pipe(
      map((data) => {
        if (groupBy) {
          return data.reduce((acc, curr) => {
            const group = curr[groupBy];
            if (!acc[group]) {
              acc[group] = [];
            }
            acc[group].push(curr);
            return acc;
          }, {});
        }
        return data;
      }),
      map((data) => {
        if (aggregate && groupBy) {
          return Object.keys(data).map((key) => {
            return {
              [groupBy]: key,
              [aggregate]: data[key].reduce((acc: any, curr: any) => {
                acc += curr[aggregate];
                return acc;
              }, 0),
            };
          });
        }
        return data;
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
