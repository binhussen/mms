import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import tableActions from 'src/app/store/actions/table.actions';
import { AppState } from 'src/app/store/models/app.state';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss'],
})
export class PageDetailComponent implements OnInit, OnDestroy {
  sub!: Subscription;

  constructor(
    public activatedRoute: ActivatedRoute,
    private store$: Store<AppState>,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.data
      .pipe(
        distinctUntilChanged(),
        tap(({ table, title }) => {
          console.log(table);
          this.titleService.setTitle(title ?? 'MMS - MMS');

          if (table.links && table.childOf) {
            const temp: any = {};
            temp[Object.keys(table.childOf)[0]] =
              this.activatedRoute.snapshot.params.id;

            table = { ...table, childOf: table.childOf };

            table = {
              ...table,
              links: {
                ...table.links,
                getPath: `${table.links.getPath}?${
                  Object.keys(table.childOf)[0]
                }=${this.activatedRoute.snapshot.params.id}`,
              },
            };

            this.store$.dispatch(tableActions.setTableState({ value: table }));
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
