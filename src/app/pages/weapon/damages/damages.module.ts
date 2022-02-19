import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DamagesComponent } from './damages.component';
import { RouterModule } from '@angular/router';
import { MmsCommonModule } from './../../../mms-common/mms-common.module';
import { DamageDetailComponent } from './damage-detail/damage-detail.component';

@NgModule({
  declarations: [DamagesComponent, DamageDetailComponent],
  imports: [
  CommonModule,
    MmsCommonModule,
    RouterModule.forChild([
      { path: '', component: DamagesComponent },
      { path: 'id', component: DamageDetailComponent }

    ]),
  ],
})
export class DamagesModule {}
