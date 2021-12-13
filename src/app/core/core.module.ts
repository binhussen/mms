import {ErrorHandler, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GlobalErrorHandler} from "./errors/global-error.handler";
import {MatSnackBarModule} from "@angular/material/snack-bar";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ]
})
export class CoreModule { }
