import { SidebarLinkTypes, LayoutOptions, FooterTypes } from '@codebyjordan/ui';

export const LAYOUT_CONFIG: LayoutOptions = {
  footerType: FooterTypes.BOTTOM,
  footerClasses: 'bg-primary navbar-dark',
  useSidebar: true,
  closeOnClick: false,
  navbarClasses: 'navbar-dark bg-primary',
  mainScrollbarOptions: {
    isRoot: true,
    alwaysVisible: true,
    styles: {
      bar: {
        'background': '#004FFF'
      },
      grid: {
        'background': '#14213D'
      }
    }
  },
  sidebarLinks: [
    { text: 'CBJ UI', link: '/cbj-ui', type: SidebarLinkTypes.LINK, icon: 'home' },

    { text: 'Components', icon: 'web', type: SidebarLinkTypes.HEADING },
    { link: '/components/buttons', text: 'Buttons', type: SidebarLinkTypes.LINK},
    { text: 'Datatable', type: SidebarLinkTypes.DROPDOWN, dropdownShow: false, children: [
        { link: '/components/datatable/table', text: 'Table', type: SidebarLinkTypes.LINK},
        { link: '/components/datatable/link-cell', text: 'Link Cell', type: SidebarLinkTypes.LINK},
        { link: '/components/datatable/bytes-transform', text: 'Bytes Transform', type: SidebarLinkTypes.LINK},
      ]
    },
    { text: 'Layout', type: SidebarLinkTypes.DROPDOWN, dropdownShow: false, children: [
        { link: '/components/layout/layout', text: 'Layout', type: SidebarLinkTypes.LINK},
        { link: '/components/layout/menu', text: 'Menu', type: SidebarLinkTypes.LINK},
        { link: '/components/layout/card-tabs', text: 'Card Tabs', type: SidebarLinkTypes.LINK},
      ]
    },
    { text: 'Scrolling', type: SidebarLinkTypes.DROPDOWN, dropdownShow: false, children: [
        { link: '/components/scrolling/scrollbar', text: 'Scrollbar', type: SidebarLinkTypes.LINK},
        { link: '/components/scrolling/in-view', text: 'In View', type: SidebarLinkTypes.LINK},
        { link: '/components/scrolling/animate-in-view', text: 'Animate In View', type: SidebarLinkTypes.LINK},
        { link: '/components/scrolling/parallax', text: 'Parallax', type: SidebarLinkTypes.LINK},
      ]
    },

    { text: 'Animations', icon: 'subscriptions', type: SidebarLinkTypes.HEADING },
    { link: '/animations/ripple', text: 'Ripple', type: SidebarLinkTypes.LINK},
    { link: '/animations/easings', text: 'Easings', type: SidebarLinkTypes.LINK},
    { link: '/animations/transitions', text: 'Transitions', type: SidebarLinkTypes.LINK},

    { text: 'Guides', icon: 'book', type: SidebarLinkTypes.HEADING },
    { link: '/guides/getting-started', text: 'Getting Started', type: SidebarLinkTypes.LINK },
    { link: '/guides/styling', text: 'Styling', type: SidebarLinkTypes.LINK },
  ]
};
