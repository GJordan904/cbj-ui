import {ScrollBarOptions} from './scroll.models';

export interface LayoutConfig {
  sidebarLinks?:  SidebarLink[];
  navbarClasses?: string;
  linkClasses?: SidebarLinksClasses;
  useSidebar?: boolean;
  mainScrollbarOptions?: ScrollBarOptions;
  sideScrollbarOptions?: ScrollBarOptions;
}

export interface SidebarLinksClasses {
  heading?: string;
  dropdown?: string;
  link?: string;
  active?: string;
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
