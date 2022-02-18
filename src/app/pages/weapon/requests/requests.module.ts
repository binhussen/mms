import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RequestsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: RequestsComponent }]),
  ],
})
export class RequestsModule {}
