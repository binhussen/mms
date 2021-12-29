import { Component, OnInit } from '@angular/core';
import sampleForm from './sample.form';
import { Action } from '../../mms-common/organisms/table/table.component';
import { SampleHttpService } from './sample.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss'],
})
export class SampleComponent implements OnInit {
  form = sampleForm;
  url = 'http://localhost:3000/elements';
  // url = "https://jsonplaceholder.typicode.com/todos";
  // url = "https://jsonplaceholder.typicode.com/posts";
  actions: Array<Action> = [
    { name: 'Expand', type: 'expand', path: 'notify' },
    { name: 'Edit', type: 'edit' },
  ];
  path = '/elements';
  constructor(private sampleHttpService: SampleHttpService) {}

  ngOnInit(): void {
    this.sampleHttpService
      .findAll('http://localhost:3000/elements')
      .subscribe((r) => console.log(r));
  }
}
