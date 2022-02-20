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

  navLinks = [
    { location: '', label: 'dummy', icon: 'menu' },
    { location: 'shared', label: 'Overview', icon: 'account_circle' },
    { location: 'shared/sub', label: 'Experience', icon: 'work' },
  ];
  // tables, forms
  // tab with table, form

  // can the data be passed through router?
  // and build the tabbed page from the router
  //
  constructor() {}

  ngOnInit(): void {}
}
