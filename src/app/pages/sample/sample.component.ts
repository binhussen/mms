import { Component, OnInit } from '@angular/core';
import sampleForm from "./sample.form";
import {Action} from "../../mms-common/organisms/table/table.component";

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {
  form = sampleForm;
  url = "http://localhost:3000/elements";
  // url = "https://jsonplaceholder.typicode.com/todos";
  // url = "https://jsonplaceholder.typicode.com/posts";
  actions: Array<Action> = [
    {name: 'Expand', type: 'expand', path: 'notify'},
    {name: 'Edit', type: 'edit'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
