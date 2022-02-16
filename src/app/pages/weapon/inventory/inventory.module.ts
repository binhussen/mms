import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { RouterModule } from '@angular/router';
import { MmsCommonModule } from 'src/app/mms-common/mms-common.module';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';

@NgModule({
  declarations: [InventoryComponent, InventoryDetailComponent],
  imports: [
    CommonModule,
    MmsCommonModule,
    RouterModule.forChild([
      { path: '', component: InventoryComponent },
      { path: ':id', component: InventoryDetailComponent },
    ]),
  ],
})
export class InventoryModule {}
