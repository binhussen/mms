import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyComponent } from './notify.component';
import { RouterModule } from '@angular/router';
import { MmsCommonModule } from 'src/app/mms-common/mms-common.module';
import { NotifyDetailComponent } from './notify-detail/notify-detail.component';

@NgModule({
  declarations: [NotifyComponent, NotifyDetailComponent],
  imports: [
    CommonModule,
    MmsCommonModule,
    RouterModule.forChild([
      { path: '', component: NotifyComponent },
      { path: ':id', component: NotifyDetailComponent },
    ]),
  ],
})
export class NotifyModule {}
