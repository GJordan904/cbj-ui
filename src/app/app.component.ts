import { Component } from '@angular/core';
import {SidebarLinks} from '@codebyjordan/ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sidebarLinks: SidebarLinks = {
    classes: 'list-group-item',
    activeClass: 'active',
    links: [
      { link: '/home', text: 'Home' },
      { link: '', text: 'Components', dropdown: true, dropdownShow: false, children: [
          { link: '/components/app-drawer', text: 'App Drawer'},
          { link: '/components/anim-in-view', text: 'Animate In View'},
          { link: '/components/card-tabs', text: 'Card Tabs'},
        ]
      },
      { link: '', text: 'Directives', dropdown: true, dropdownShow: false, children: [
        { link: '/directives/el-in-view', text: 'Element In View'},
      ]
      },
      { link: '', text: 'Services', dropdown: true, dropdownShow: false, children: [
        { link: '/services/scroll-service', text: 'Scroll Service'},
      ]
      },
      { link: '', text: 'Pipes', dropdown: true, dropdownShow: false, children: [
        { link: '/pipes/bytes-transform', text: 'Bytes Transform'},
      ]
      },
    ]
  };
}
