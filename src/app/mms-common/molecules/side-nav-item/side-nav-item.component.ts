import {Component, Input, OnInit} from '@angular/core';
import {Menu} from "../../models";

@Component({
  selector: 'app-side-nav-item',
  templateUrl: './side-nav-item.component.html',
  styleUrls: ['./side-nav-item.component.scss']
})
export class SideNavItemComponent implements OnInit {
  @Input() menu!: Menu;
  @Input() secondaryMenu = false;
  constructor() { }

  ngOnInit(): void {
  }

}
