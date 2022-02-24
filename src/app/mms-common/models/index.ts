export interface Menu {
  name: string;
  icon: string;
  link?: string;
  open: boolean;
  sub?: Array<Menu>;
  trans: string;
}
