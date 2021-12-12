import {ErrorHandler, Injectable, NgZone} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
 //   private errorDialogService: ErrorDialogService,
 private _snackBar: MatSnackBar,
    private zone: NgZone
  ) {}

  handleError(error: any) {
    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }
    this.zone.run(() =>
      this._snackBar.open(error?.error.description || 'Undefined client error', "close", {duration: 4000, verticalPosition: 'top', panelClass: 'error'})
    );
    // console.log( error?.message || 'Undefined client error', error?.status)
    //console.error('Error from global error handler', error);0
  }
}
