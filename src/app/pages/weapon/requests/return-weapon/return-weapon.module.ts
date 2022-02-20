import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnWeaponComponent } from './return-weapon.component';
import { RouterModule } from '@angular/router';
import { MmsCommonModule } from 'src/app/mms-common/mms-common.module';

@NgModule({
  declarations: [ReturnWeaponComponent],
  imports: [
    CommonModule,
    MmsCommonModule,
    RouterModule.forChild([{ path: '', component: ReturnWeaponComponent }]),
  ],
})
export class ReturnWeaponModule {}
