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
      {
        path: '',
        component: RequestsComponent,
        children: [
          { path: '', redirectTo: 'request-for-weapon', pathMatch: 'full' },
          {
            path: 'request-for-weapon',
            loadChildren: () =>
              import('./request-weapon/request-weapon.module').then(
                (m) => m.RequestWeaponModule
              ),
          },
          {
            path: 'request-for-return-weapon',
            loadChildren: () =>
              import('./return-weapon/return-weapon.module').then(
                (m) => m.ReturnWeaponModule
              ),
          },
        ],
      },
    ]),
  ],
})
export class RequestsModule {}
