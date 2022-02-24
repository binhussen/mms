import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/core/services/base.service";
 
@Injectable({ providedIn: 'root' })
export class DashboardService extends BaseService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '');
  }
}
