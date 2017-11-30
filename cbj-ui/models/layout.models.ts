export interface SidebarLinks {
  links: Array<SidebarLink>;
  classes?: {
    heading?: string;
    dropdown?: string;
    link?: string;
  };
  activeClass?: string;
}

export interface SidebarLink {
  text: string;
  type: SidebarLinkTypes;
  link?: string;
  dropdownShow?: boolean;
  dropdownHeight?: number;
  children?: Array<SidebarLink>;
}

export enum SidebarLinkTypes {
  HEADING,
  DROPDOWN,
  LINK
}
