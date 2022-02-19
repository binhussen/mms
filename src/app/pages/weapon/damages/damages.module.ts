import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DamagesComponent } from './damages.component';
import { RouterModule } from '@angular/router';
import { MmsCommonModule } from './../../../mms-common/mms-common.module';

@NgModule({
  declarations: [DamagesComponent],
  imports: [
  CommonModule,
    MmsCommonModule,
    RouterModule.forChild([{ path: '', component: DamagesComponent }]),
  ],
})
export class DamagesModule {}
