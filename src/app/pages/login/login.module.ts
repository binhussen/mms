import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {MatCardModule} from "@angular/material/card";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MmsCommonModule} from "../../mms-common/mms-common.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild([
      {path: '', component: LoginComponent}
    ]),
    FlexLayoutModule,
    MmsCommonModule,
    MatButtonModule
  ]
})
export class LoginModule { }
