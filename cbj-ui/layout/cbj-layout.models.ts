import { ScrollbarOptions } from '../scroll/index';
import { RippleConfig } from '../ripple/index';

/**
 * @interface LayoutOptions
 * The options object used to configure the LayoutConfig
 *
 * @property {FooterTypes}         - footerType           - One of the FooterTypes enum indicating the type of footer
 * @property {string}              - footerClasses        - the classes applied to the footer <nav> element
 * @property {string}              - navbarClasses        - the classes applied to the navbar <nav> element
 * @property {boolean}             - useSidebar           - indicates whether to use the sidebar
 * @property {SidebarLink[]}       - sidebarLinks         - The links for the sidebar
 * @property {boolean}             - closeOnClick         - indicates whether the sidebar closes when you click a link
 * @property {SidebarLinksClasses} - linkClasses          - the classes to be applied to the different link SidebarLinkTypes
 * @property {ScrollbarOptions}    - mainScrollbarOptions - the options object passed to the main scrollbars configuration
 * @property {ScrollbarOptions}    - sideScrollbarOptions - the options object passed to the sidebar scrollbars configuration
 */
export interface LayoutOptions {
  footerType: FooterTypes;
  footerClasses?: string;
  navbarClasses?: string;
  useSidebar?: boolean;
  sidebarLinks?:  SidebarLink[];
  rippleConf?: RippleConfig;
  closeOnClick?: boolean;
  linkClasses?: SidebarLinksClasses;
  mainScrollbarOptions?: ScrollbarOptions;
  sideScrollbarOptions?: ScrollbarOptions;
}

/**
 * @interface SidebarLinksClasses
 * Object representing the classes applied to a SidebarLink.
 * One key for each SidebarLinkTypes and an active key
 *
 * @property {string}  -  heading   - classes applied to heading links
 * @property {string}  -  dropdown  - classes applied to dropdown links
 * @property {string}  -  link      - classes applied to regular links
 * @property {string}  -  active    - classes applied to a link when it is active
 */
export interface SidebarLinksClasses {
  heading?: string;
  dropdown?: string;
  link?: string;
  active?: string;
}

/**
 * @interface SidebarLink
 * Object representing a link in the sidebar
 *
 * @property {string}            -  text            - the links text
 * @property {SidebarLinkTypes}  -  type            - the type of link
 * @property {string}            -  icon            - an icon for the link. a material icon reference
 * @property {string}            -  link            - the url or route
 * @property {boolean}           -  dropdownShow    - used internally for toggling the drop down
 * @property {number}            -  dropdownHeight  - used internally for sizing
 * @property {SidebarLink[]}     -  children        - the links that fall under a dropdown
 */
export interface SidebarLink {
  text: string;
  type: SidebarLinkTypes;
  icon?: string;
  link?: string;
  dropdownShow?: boolean;
  dropdownHeight?: number;
  children?: SidebarLink[];
}

/**
 * @enum SidebarLinkTypes
 * The three types of sidebar links
 */
export enum SidebarLinkTypes {
  HEADING,
  DROPDOWN,
  LINK
}

/**
 * @enum FooterTypes
 * The three types of footers
 */
export enum FooterTypes {
  NONE,
  BOTTOM,
  STICKY,
}
