import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DamagesComponent } from './damages.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DamagesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DamagesComponent }]),
  ],
})
export class DamagesModule {}
