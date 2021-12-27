import {Menu} from "../models";

export const   menus: Array<Menu> = [
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
        link: "notify",
        open: false
      },
      {
        name: "Inventory",
        icon: "",
        link: "inventory",
        open: false
      },
      {
        name: "Request",
        icon: "",
        link: "request",
        open: false
      },
      {
        name: "Report Damages",
        icon: "",
        link: "report-damage",
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
