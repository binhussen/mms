import { Injectable } from '@angular/core';
import { BaseService } from '../core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { concat, merge, Observable, of, zip } from 'rxjs';
import {
  catchError,
  concatMap,
  distinctUntilChanged,
  map,
  mergeMap,
  switchMap,
  takeLast,
  takeWhile,
  tap,
} from 'rxjs/operators';
import { AppState } from './models/app.state';
import { Store } from '@ngrx/store';
import formActions from './actions/form.actions';
import tableActions from './actions/table.actions';

@Injectable({ providedIn: 'root' })
export class CrudHttpService extends BaseService<any> {
  constructor(httpClient: HttpClient, private store$: Store<AppState>) {
    super(httpClient, '');
  }

  manageFormSubmission() {
    // get submitted data from store
    // if the action is create, then create the resource with it's relations
    // if the action is update, then determine if there is a change in the relations
    // if there is a change, then update the relations
    // if there is no change, then update the resource
    return this.store$
      .select((state: AppState) => state)
      .pipe(
        takeWhile((state: AppState) => state.form.status === 'PENDING'),
        map((state) =>
          state.form.action === 'create'
            ? {
                data: state.form.data,
                submittedToUrl: state.form.submittedToUrl,
                action: state.form.action,
                relations: state.table.relations,
                childOf: state.table.childOf,
              }
            : {
                data: this.checkForChange(state.form.data, state.form.updating),
                submittedToUrl: state.form.submittedToUrl,
                action: state.form.action,
                relations: state.table.relations,
                childOf: state.table.childOf,
              }
        )
      )
      .pipe(
        distinctUntilChanged(),

        concatMap((form) => {
          if (form.action === 'create') {
            const { single, bulk } = this.getSingleAndBulk(
              form.data,
              form.relations,
              form.action,
              form.submittedToUrl ?? '',
              form.childOf
            );
            return this.createResource(single.data, single.submittedToUrl).pipe(
              tap((response) => console.log(response)),
              distinctUntilChanged(),
              mergeMap((response: any) =>
                // subscribe all and return response
                zip(
                  of(response),
                  Object.keys(bulk)
                    .map((key) =>
                      bulk[key].data
                        .map((item: any) => {
                          const temp = { ...item };
                          temp[
                            `${this.getLastPathFromUrl(
                              single.submittedToUrl
                            )}Id`
                          ] = response.id;
                          return this.createResource(
                            temp,
                            bulk[key].submittedToUrl
                          );
                        })
                        .reduce(
                          (acc: any, curr: any) => concat(acc, curr),
                          of(null)
                        )
                    )
                    .reduce((acc, curr) => concat(acc, curr), of(response))
                )
              )
            );
          }
          // @TODO this part of the code needs to be refactored
          const { single, bulk } = this.getSingleAndBulk(
            form.data,
            form.relations,
            form.action ?? 'create',
            form.submittedToUrl ?? ''
          );
          let singleObs = this.updateResource(
            single.data,
            single.submittedToUrl
          );
          let bulkObs = Object.keys(bulk).map((key) => {
            return this.updateResource(
              bulk[key].data,
              bulk[key].submittedToUrl
            );
          });
          return singleObs.pipe(concatMap((_) => bulkObs));
        }),
        catchError((error) => of(error))
      );
  }

  createResource(data: any, url: string): Observable<any> {
    if (Object.keys(data).length <= 1) {
      console.log(data);
      return new Observable((observer) => {
        observer.next(null);
      });
    }
    return this.httpClient.post(`${url}`, data);
  }

  updateResource(data: any, url: string): Observable<any> {
    if (Object.keys(data).length <= 1) {
      return new Observable((observer) => {
        observer.next(null);
      });
    }
    return this.httpClient.patch(`${this.getUrl(url, data.id)}`, data);
  }

  getSingleAndBulk(
    data: any,
    relations: any,
    action: string,
    submittedToUrl: string,
    childOf?: { [key: string]: number }
  ) {
    const single: any = {};
    const bulk: any = {};
    let temp: any = {};

    if (childOf) {
      temp = { ...childOf };
    }

    for (let key in data) {
      if (data[key] === null) {
        delete data[key];
      }
      if (Array.isArray(data[key])) {
        bulk[key] = {
          data: data[key],
          submittedToUrl:
            action === 'create'
              ? relations?.find((relation: any) => relation.type === key)?.links
                  .createPath
              : relations?.find((relation: any) => relation.type === key)?.links
                  .updatePath,
        };
      } else {
        temp[key] = data[key];
      }
    }
    single['data'] = temp;
    single['submittedToUrl'] = submittedToUrl;
    return {
      single,
      bulk,
    };
  }

  checkForChange(data: any, updating: any) {
    const res: any = {
      id: updating?.id,
    };
    for (let key in data) {
      if (
        Array.isArray(data[key]) &&
        updating &&
        Array.isArray(updating[key])
      ) {
        res[key] = data[key].map((item: any, index: number) =>
          this.checkForChange(item, updating[key][index] ?? {})
        );
      } else if (updating && data[key] !== updating[key]) {
        res[key] = data[key];
      } else if (data && !updating[key]) {
        res[key] = data[key];
      }
    }
    return res;
  }

  submitForm(data: any, submittedToUrl: string): Observable<any> {
    // check if there is an array in the data
    // if there is, then it is a bulk action
    // if there is not, then it is a single action
    let bulkMap: any = {};
    let singleMap: any = {};
    for (let key in data) {
      if (Array.isArray(data[key])) {
        // bulk action
        // concat the observable
        bulkMap[key] = data[key];
      } else {
        // single action
        // concat the observable
        singleMap[key] = data[key];
      }
    }
    return this.createOne(singleMap, submittedToUrl).pipe(
      mergeMap((response) => {
        let result: Array<Observable<any>> = [];

        if (Object.keys(bulkMap).length > 0) {
          for (let key in bulkMap) {
            result = bulkMap[key].map((item: any) => {
              const temp = { ...item };
              temp[`${this.getLastPathFromUrl(submittedToUrl)}Id`] =
                response.id;
              return this.createOne(
                temp,
                `${this.getBaseUrl(submittedToUrl)}/${key}`
              );
            });
          }
        }
        return result.reduce((acc, curr) => {
          return acc.pipe(mergeMap((_) => curr));
        });
      })
    );
  }
  getBaseUrl(url: string): string {
    return url.split('/').slice(0, -1).join('/');
  }
  getLastPathFromUrl(url: string): string {
    let path = url.split('/');
    return path[path.length - 1];
  }

  fetchDataFromRelations(row: any): Observable<any> {
    let res: any = {};
    return this.store$
      .select((state: AppState) => state.table.relations)
      .pipe(
        mergeMap(async (relations) => {
          if (relations && relations.length > 0) {
            for (let relation of relations) {
              res[relation.type] = await this.fetchData(
                this.getUrl(relation.links.getPath, row.id),
                {}
              )
                .pipe(map((response) => response.body))
                .toPromise();
            }
          }
          return { ...row, ...res };
        })
      );
  }
  fetchData(url: string, params: any): Observable<any> {
    return this.httpClient.get(`${url}`, {
      observe: 'response',
      params,
    });
  }

  getUrl(url: string, id?: string): string {
    if (id) {
      url = url.replace('[id]', id);
    }
    return url;
  }
}
