import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import { RouterModule } from '@angular/router';
import { MmsCommonModule } from 'src/app/mms-common/mms-common.module';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [RequestsComponent, RequestDetailComponent],
  imports: [
    CommonModule,
    MmsCommonModule,
    MatTabsModule,
    RouterModule.forChild([
      { path: '', component: RequestsComponent},
      { path: ':id', component: RequestDetailComponent }]),
  ],
})
export class RequestsModule {}
