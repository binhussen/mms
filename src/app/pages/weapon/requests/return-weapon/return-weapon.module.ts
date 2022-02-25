import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MmsCommonModule } from 'src/app/mms-common/mms-common.module';
import { PageModule } from 'src/app/pages/page/page.module';
import { PageComponent } from 'src/app/pages/page/page.component';
import returnWeaponPage from './return-weapon.page';
import returnWeaponDetailPage from './return-weapon-detail.page';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MmsCommonModule,
    PageModule,
    RouterModule.forChild([
      { path: '', component: PageComponent, data: returnWeaponPage },
      { path: ':id', component: PageComponent, data: returnWeaponDetailPage },
    ]),
  ],
})
export class ReturnWeaponModule {}
