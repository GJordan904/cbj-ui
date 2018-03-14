import { AfterViewInit, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { LayoutConfig } from './layout-config.class';
import { SidebarLink, SidebarLinkTypes } from './cbj-layout.models';
import { fade } from '../animations';
import { WindowService } from '../@codebyjordan/scrollbar';

@Component({
  selector: 'cbj-layout',
  templateUrl: './cbj-layout.component.html',
  animations: [ fade(350, 'ease-in-out') ]
})
export class CbjLayoutComponent implements AfterViewInit {
  @HostBinding('class') classes = 'cbj-site-wrapper';
  @Input('config')config: LayoutConfig;
  sidebarOpen = false;

  constructor(private ws: WindowService) {}

  ngAfterViewInit() {
    for (const link of this.config.sidebarLinks) {
      if (link.type === SidebarLinkTypes.DROPDOWN) {
        link.dropdownHeight = link.children.length * 47.33;
      }
    }
  }

  get isMobile() {
    return this.ws.isMobile;
  }

  linkClick() {
    if (this.config.closeOnClick) {
      this.toggleSidebar();
    }
  }

  toggleDropdown(link: SidebarLink) {
    link.dropdownShow = !link.dropdownShow;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.toggleWrapperClass();
  }

  toggleWrapperClass() {
    if (this.sidebarOpen) {
      this.config.toggleClasses.next({el: 'wrapper', classes: 'open', remove: false});
    }else {
      this.config.toggleClasses.next({el: 'wrapper', classes: 'open', remove: true});
    }
  }
}
