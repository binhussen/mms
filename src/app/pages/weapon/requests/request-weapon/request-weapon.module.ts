import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MmsCommonModule } from 'src/app/mms-common/mms-common.module';
import { PageComponent } from 'src/app/pages/page/page.component';
import { PageModule } from 'src/app/pages/page/page.module';
import requestWeaponPage from './request-weapon.page';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MmsCommonModule,
    PageModule,
    RouterModule.forChild([
      { path: '', component: PageComponent, data: requestWeaponPage },
    ]),
  ],
})
export class RequestWeaponModule {}
