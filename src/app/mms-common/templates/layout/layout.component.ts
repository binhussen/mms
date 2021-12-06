import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawerMode} from "@angular/material/sidenav/drawer";
import {MediaChange, MediaObserver} from '@angular/flex-layout';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  sideNavOpened = true;
  matDrawerOpened = true;
  matDrawerShow = true;
  sideNavMode: MatDrawerMode = 'side';
  @ViewChild('drawerob') drawerob!: any;
  user = {firstName: "Ezedin", lastName: "Fedlu"};
  constructor(private media: MediaObserver) {
    this.media.asObservable().subscribe(m => m.map(r => this.toggleView()));
  }

  ngOnInit(): void {
  }

  toggleView() {
    if (this.media.isActive('gt-md')) {
      this.sideNavMode = 'side';
      this.sideNavOpened = true;
      this.matDrawerOpened = false;
      this.matDrawerShow = true;
    } else if (this.media.isActive('gt-xs')) {
      this.sideNavMode = 'over';
      this.sideNavOpened = false;
      this.matDrawerOpened = false;
      this.matDrawerShow = false;
    } else if (this.media.isActive('lt-sm')) {
      this.sideNavMode = 'over';
      this.sideNavOpened = false;
      this.matDrawerOpened = false;
      this.matDrawerShow = false;
    }
  }
}
