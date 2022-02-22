import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'notifies',
        loadChildren: () =>
          import('./notify/notify.module').then((m) => m.NotifyModule),
      },
      {
        path: 'inventories',
        loadChildren: () =>
          import('./inventory/inventory.module').then((m) => m.InventoryModule),
      },
      {
        path: 'requests',
        loadChildren: () =>
          import('./requests/requests.module').then((m) => m.RequestsModule),
      },
      {
        path: 'damages',
        loadChildren: () =>
          import('./damages/damages.module').then((m) => m.DamagesModule),
      },
    ]),
  ],
})
export class WeaponModule {}
