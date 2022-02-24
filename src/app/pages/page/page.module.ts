import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { TabbedPageComponent } from './tabbed-page/tabbed-page.component';
import { MmsCommonModule } from 'src/app/mms-common/mms-common.module';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [PageComponent, PageDetailComponent, TabbedPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatMenuModule,
    MmsCommonModule,
    HttpClientModule,
  ],
  exports: [PageComponent, PageDetailComponent, TabbedPageComponent],
})
export class PageModule {}
