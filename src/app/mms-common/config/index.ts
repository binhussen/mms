import { Menu } from '../models';

export const menus: Array<Menu> = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    link: 'dashboard',
    open: false,
  },
  {
    name: 'Weapon',
    icon: 'view_in_ar',
    open: true,
    sub: [
      {
        name: 'Notify Weapon',
        icon: '',
        link: 'weapon/notifies',
        open: false,
      },
      {
        name: 'Inventory',
        icon: '',
        link: 'weapon/inventory',
        open: false,
      },
      {
        name: 'Request',
        icon: '',
        link: 'weapon/requests',
        open: false,
      },
      {
        name: 'Report Damages',
        icon: '',
        link: 'weapon/damages',
        open: false,
      },
    ],
  },
  {
    name: 'User Management',
    icon: 'person',
    link: 'dashboard',
    open: false,
  },
];
