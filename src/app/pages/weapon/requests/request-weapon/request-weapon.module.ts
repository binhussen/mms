import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MmsCommonModule } from 'src/app/mms-common/mms-common.module';
import { PageComponent } from 'src/app/pages/page/page.component';
import { PageModule } from 'src/app/pages/page/page.module';
import requestWeaponPage from './request-weapon.page';
import { PageDetailComponent } from 'src/app/pages/page/page-detail/page-detail.component';
import requestWeaponDetailPage from './request-weapon-detail.page';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MmsCommonModule,
    PageModule,
    RouterModule.forChild([
      { path: '', component: PageComponent, data: requestWeaponPage },
      {
        path: ':id',
        component: PageDetailComponent,
        data: requestWeaponDetailPage,
      },
    ]),
  ],
})
export class RequestWeaponModule {}
