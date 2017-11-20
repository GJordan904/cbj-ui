export interface SidebarLinks {
  classes: string;
  activeClass: string;
  links: Array<SidebarLink>;
}

export interface SidebarLink {
  link: string;
  text: string;
  dropdown?: boolean;
  dropdownShow?: boolean;
  dropdownHeight?: number;
  children?: Array<SidebarLink>;
}
