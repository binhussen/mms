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
  OnInit,
  VERSION,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NgControl,
  NgForm,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  CanUpdateErrorState,
  ErrorStateMatcher,
  ThemePalette,
} from '@angular/material/core';
import {} from '@angular/material/core/common-behaviors';
import {
  forkJoin,
  Observable,
  of,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { concatMap, finalize, map, mergeMap, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpEventType,
  HttpProgressEvent,
  HttpResponse,
} from '@angular/common/http';

export type FileOrArrayFile = File | Array<File> | File[];
interface UploadList {
  name: string;
  progress: number;
}
@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mms-file-input',
  },
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => FileInputComponent),
    },
  ],
})
export class FileInputComponent {
  @Input()
  title!: string;
  display: FormControl = new FormControl('', Validators.required);
  file_store!: FileList;
  file_list: Array<UploadList> = [];
  uploadSubs: Array<Subscription> = [];
  results: Array<string> = [];

  @Output()
  onUploadingFinish = new EventEmitter();

  constructor(private http: HttpClient) {}
  // TODO: validator in terms of type and size
  // TODO: what is maximum acceptable file size
  // TODO: what file type should be allowed?
  handleFileInputChange(l: FileList | null): void {
    if (l) {
      this.file_store = l;
      if (l.length) {
        const f = l[0];
        const count = l.length > 1 ? `(+${l.length - 1} files)` : '';
        this.display.patchValue(`${f.name}${count}`);
        this.file_list = [];
        const formData: Array<FormData> = [];
        for (let i = 0; i < this.file_store.length; i++) {
          const fd = new FormData();
          fd.append('files', this.file_store[i], this.file_store[i].name);
          formData.push(fd);
          this.file_list.push({ name: this.file_store[i].name, progress: 0 });
        }
        this.upload(formData);
      } else {
        this.display.patchValue('');
      }
    }
  }
  clickOnInput(event: any, input: any) {
    // event.preventDefault();
    input.click();
  }

  upload(fd: Array<FormData>) {
    const observables = fd.map((item) =>
      this.http.post('https://v2.convertapi.com/upload', item, {
        reportProgress: true,
        observe: 'events',
      })
    );
    const uploadProgress$ = new ReplaySubject<{
      e: HttpProgressEvent;
      i: number;
    }>();
    let tempSub = forkJoin(
      observables.map((req, index) => {
        return req.pipe(
          tap((e) => {
            if (e.type === HttpEventType.UploadProgress) {
              uploadProgress$.next({ e: e as HttpProgressEvent, i: index });
            }
          })
        );
      })
    )
      .pipe(finalize(() => this.display.reset()))
      .subscribe((results: any) => {
        uploadProgress$.complete();
        this.onUploadingFinish.emit(
          results.map((result: any) => result.body.Url)
        );
      });
    let uploadProgressSub = uploadProgress$.subscribe((progress) => {
      this.file_list[progress.i].progress = Math.round(
        100 * (progress.e.loaded / (progress.e.total ?? 1))
      );
    });
    this.uploadSubs.push(tempSub);
    this.uploadSubs.push(uploadProgressSub);
  }
}
