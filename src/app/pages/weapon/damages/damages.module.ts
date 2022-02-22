import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MmsCommonModule } from 'src/app/mms-common/mms-common.module';
import { RouterModule } from '@angular/router';
import { PageComponent } from '../../page/page.component';
import damagesPage from './damages.page';
import { PageDetailComponent } from '../../page/page-detail/page-detail.component';
import damagesDetailPage from './damages-detail.page';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MmsCommonModule,
    RouterModule.forChild([
      { path: '', component: PageComponent, data: damagesPage }, // page
      { path: ':id', component: PageDetailComponent, data: damagesDetailPage }, // page detail
    ]),
  ]
})
export class DamagesModule { }
