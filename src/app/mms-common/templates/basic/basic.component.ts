import { Component, Input, OnInit } from '@angular/core';
import { Action } from '../../organisms/table/table.component';
import { Form } from '../../models/form';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit {
  @Input()
  form!: Form;
  constructor() {}

  ngOnInit(): void {}
}
