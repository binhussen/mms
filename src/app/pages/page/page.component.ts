import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.data
      .pipe(
        distinctUntilChanged(),
        tap((data) => {
          this.titleService.setTitle(data.title ?? 'MMS - MMS');
          this.store$.dispatch(
            tableActions.setTableState({ value: data.table })
          );
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
