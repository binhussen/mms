import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild,
  ViewEncapsulation,
  Directive,
  ContentChild,
  OnInit, VERSION
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NgControl,
  NgForm,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { CanUpdateErrorState, ErrorStateMatcher, ThemePalette } from '@angular/material/core';
import {  } from '@angular/material/core/common-behaviors';
import { Subject } from 'rxjs';
import {MatFormFieldControl} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {finalize} from "rxjs/operators";
import {HttpEventType} from "@angular/common/http";

export type FileOrArrayFile = File | Array<File> | File[];

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'ngx-mat-file-input'
  },
  providers: [
    { provide: MatFormFieldControl, useExisting: forwardRef(() => FileInputComponent) }
  ],
})
export class FileInputComponent {

  name = "Angular " + VERSION.major;
  display: FormControl = new FormControl("", Validators.required);
  file_store!: FileList;
  file_list: Array<string> = [];

  handleFileInputChange(l: FileList | null): void {
    if (l) {
      this.file_store = l;
      if (l.length) {
        const f = l[0];
        const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
        this.display.patchValue(`${f.name}${count}`);
      } else {
        this.display.patchValue("");
      }
      console.log(l);
    }
  }

  handleSubmit(): void {
    const fd = new FormData();
    this.file_list = [];
    for (let i = 0; i < this.file_store.length; i++) {
      fd.append("files", this.file_store[i], this.file_store[i].name);
      this.file_list.push(this.file_store[i].name);
    }

    // do submit ajax

    // const upload$ = this.http.post("/api/thumbnail-upload", fd, {
    //   reportProgress: true,
    //   observe: 'events'
    // })
    //   .pipe(
    //     finalize(() => this.reset())
    //   );
    //
    // this.uploadSub = upload$.subscribe(event => {
    //   if (event.type == HttpEventType.UploadProgress) {
    //     this.uploadProgress = Math.round(100 * (event.loaded / event.total));
    //   }
    // })

  }
}
