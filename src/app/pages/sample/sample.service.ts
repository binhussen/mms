import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { Element } from './element';

@Injectable()
export class SampleHttpService extends BaseService<Element> {
  constructor(public httpClient: HttpClient) {
    super(httpClient, '/elements');
  }
}
