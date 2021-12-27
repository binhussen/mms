import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

/**
 *

GET    /posts
GET    /posts/1
POST   /posts
PUT    /posts/1
PATCH  /posts/1
DELETE /posts/1


Singular routes
GET    /profile
POST   /profile
PUT    /profile
PATCH  /profile



Filter
Use . to access deep properties

GET /posts?title=json-server&author=typicode
GET /posts?id=1&id=2
GET /comments?author.name=typicode


Paginate
Use _page and optionally _limit to paginate returned data.

In the Link header you'll get first, prev, next and last links.

GET /posts?_page=7
GET /posts?_page=7&_limit=20
 */

abstract class BaseService<T> {
  _path!: string;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private httpClient: HttpClient, private path: string) {
    this._path = path;
  }
  findAll(
    customPath?: string,
    params?: { [key: string]: string }
  ): Observable<Array<T>> {
    return this.httpClient
      .get<Array<T>>(customPath ?? this._path, {
        params: new HttpParams({ fromObject: params }),
      })
      .pipe(retry(3));
  }

  findOne(id: string): Observable<T> {
    return this.httpClient.get<T>(`${this._path}/${id}`).pipe(retry(3));
  }

  createOne(item: Omit<T, 'id'>, customPath?: string): Observable<T> {
    return this.httpClient
      .post<T>(customPath ?? this._path, item, {
        headers: this.headers,
      })
      .pipe(retry(3));
  }

  updateOne(
    id: string,
    item: Partial<Omit<T, 'id'>>,
    customPath: string
  ): Observable<T> {
    return this.httpClient
      .patch<T>(`${customPath ?? this._path}/${id}`, item)
      .pipe(retry(3));
  }

  deleteOne(id: string, customPath?: string): Observable<boolean> {
    return this.httpClient
      .delete<boolean>(`${customPath ?? this._path}/${id}`)
      .pipe(retry(3));
  }
}
