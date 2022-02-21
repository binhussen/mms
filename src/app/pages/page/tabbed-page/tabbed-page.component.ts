import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabbed-page',
  templateUrl: './tabbed-page.component.html',
  styleUrls: ['./tabbed-page.component.scss'],
})
export class TabbedPageComponent implements OnInit {
  constructor(public activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}
}
