import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {LayoutConfig, SidebarLink, SidebarLinkTypes} from '../models';
import {fade} from '../animations';
import {WindowService} from '../services';
import {Subject} from 'rxjs/Subject';

const DEFAULT_CONFIG: LayoutConfig = {
  useSidebar: false,
  navbarClasses: 'navbar-dark bg-primary',
  linkClasses: {
    active: 'active',
    heading: 'list-group-item heading',
    dropdown: 'list-group-item dropdown',
    link: 'list-group-item'
  },
  mainScrollbarOptions: {
    isRoot: true,
    alwaysVisible: true
  },
  sideScrollbarOptions: {
    wrapperWidth: '',
    wrapperClasses: 'sidebar-scroll-wrapper',
    toggleClasses: new Subject()
  }
};
@Component({
  selector: 'cbj-layout',
  templateUrl: './cbj-layout.component.html',
  animations: [ fade(350, 'ease-in-out') ]
})
export class CbjLayoutComponent implements OnInit, AfterViewInit {
  @Input('config')config: LayoutConfig;
  sidebarOpen: boolean;

  get isMobile() {
    return this.window.isMobile;
  }

  constructor(private window: WindowService) {}

  ngOnInit() {
    this.config = {
      ...DEFAULT_CONFIG,
      ...this.config
    };
  }

  ngAfterViewInit() {
    for (const link of this.config.sidebarLinks) {
      if (link.type === SidebarLinkTypes.DROPDOWN) {
        link.dropdownHeight = link.children.length * 47.33;
      }
    }
  }

  toggleDropdown(link: SidebarLink) {
    link.dropdownShow = !link.dropdownShow;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    if (this.sidebarOpen) {
      this.config.sideScrollbarOptions.toggleClasses.next({el: 'wrapper', classes: 'open', remove: false});
    }else {
      this.config.sideScrollbarOptions.toggleClasses.next({el: 'wrapper', classes: 'open', remove: true});
    }
  }
}
