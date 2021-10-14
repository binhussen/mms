import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import { SideNavComponent } from './molecules/side-nav/side-nav.component';
import { SideNavItemComponent } from './molecules/side-nav-item/side-nav-item.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import { LayoutComponent } from './templates/layout/layout.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AppModule} from "../app.module";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import { UserMenuComponent } from './molecules/user-menu/user-menu.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    SideNavComponent,
    SideNavItemComponent,
    LayoutComponent,
    UserMenuComponent
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ],
  exports: [LayoutComponent]
})
export class MmsCommonModule { }
