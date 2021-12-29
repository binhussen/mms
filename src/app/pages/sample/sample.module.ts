import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleComponent } from './sample.component';
import { RouterModule } from '@angular/router';
import { MmsCommonModule } from '../../mms-common/mms-common.module';
import { SampleHttpService } from './sample.service';

@NgModule({
  declarations: [SampleComponent],
  imports: [
    CommonModule,
    MmsCommonModule,
    RouterModule.forChild([{ path: '', component: SampleComponent }]),
  ],
  providers: [SampleHttpService],
})
export class SampleModule {}
