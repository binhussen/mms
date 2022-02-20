import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestWeaponComponent } from './request-weapon.component';
import { RouterModule } from '@angular/router';
import { MmsCommonModule } from 'src/app/mms-common/mms-common.module';

@NgModule({
  declarations: [RequestWeaponComponent],
  imports: [
    CommonModule,
    MmsCommonModule,
    RouterModule.forChild([{ path: '', component: RequestWeaponComponent }]),
  ],
})
export class RequestWeaponModule {}
