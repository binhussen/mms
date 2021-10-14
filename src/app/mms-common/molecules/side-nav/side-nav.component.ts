import { Component, OnInit } from '@angular/core';
import {Menu} from "../../models";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  menus: Array<Menu> = [
    {
      name: "Dashboard",
      icon: "dashboard",
      link: "dashboard",
      open: false
    },
    {
      name: "Weapon",
      icon: "view_in_ar",
      open: true,
      sub: [
        {
          name: "Notify Weapon",
          icon: "",
          link: "",
          open: false
        },
        {
          name: "Inventory",
          icon: "",
          link: "",
          open: false
        },
        {
          name: "Request",
          icon: "",
          link: "",
          open: false
        },
        {
          name: "Report Damages",
          icon: "",
          link: "",
          open: false
        },
      ]
    },
    {
      name: "User Management",
      icon: "person",
      link: "dashboard",
      open: false
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
