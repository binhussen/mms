import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistributeComponent } from './distribute.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MmsCommonModule } from 'src/app/mms-common/mms-common.module';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [DistributeComponent, DialogComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MmsCommonModule,
    MatTableModule,
    CdkTableModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatStepperModule,
    RouterModule.forChild([{ path: '', component: DistributeComponent }]),
    ReactiveFormsModule,
    MatToolbarModule,
  ],
})
export class DistributeModule {}
