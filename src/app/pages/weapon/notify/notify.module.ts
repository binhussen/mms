import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MmsCommonModule } from 'src/app/mms-common/mms-common.module';
import { PageModule } from '../../page/page.module';
import { PageComponent } from '../../page/page.component';
import { PageDetailComponent } from '../../page/page-detail/page-detail.component';
import notifyPage from './notify.page';
import notifyDetailPage from './notify-detail.page';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MmsCommonModule,
    PageModule,
    RouterModule.forChild([
      { path: '', component: PageComponent, data: notifyPage }, // page
      { path: ':id', component: PageDetailComponent, data: notifyDetailPage }, // page detail
    ]),
  ],
})
export class NotifyModule {}
