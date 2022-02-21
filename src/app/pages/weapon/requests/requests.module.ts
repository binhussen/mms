import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MmsCommonModule } from 'src/app/mms-common/mms-common.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageModule } from '../../page/page.module';
import requestPages from './request.pages';
import { TabbedPageComponent } from '../../page/tabbed-page/tabbed-page.component';

@NgModule({
  imports: [
    CommonModule,
    MmsCommonModule,
    MatTabsModule,
    PageModule,
    RouterModule.forChild([
      {
        path: '',
        component: TabbedPageComponent,
        data: requestPages,
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
