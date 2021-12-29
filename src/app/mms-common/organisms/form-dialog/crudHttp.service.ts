import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable()
export class CrudHttpService extends BaseService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '');
  }
}
