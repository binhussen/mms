import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabbed-page',
  templateUrl: './tabbed-page.component.html',
  styleUrls: ['./tabbed-page.component.scss'],
})
export class TabbedPageComponent implements OnInit {
  @Input()
  tabs!: Array<string>;

  selectedTabIndex: number = 0;

  // tables, forms
  // tab with table, form
  constructor() {}

  ngOnInit(): void {}
}
