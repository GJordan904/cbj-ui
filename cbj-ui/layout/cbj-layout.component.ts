import {AfterViewInit, Component, HostListener, Input, OnInit} from '@angular/core';
import {SidebarLink, SidebarLinks, SidebarLinkTypes} from '../models';
import {fade} from '../animations';

@Component({
  selector: 'cbj-layout',
  templateUrl: './cbj-layout.component.html',
  animations: [ fade(350, 'ease-in-out') ]
})
export class CbjLayoutComponent implements OnInit, AfterViewInit {
  @Input('useSidebar')useSidebar: boolean;
  @Input('navbarClasses')navbarClasses: string;
  @Input('sidebarLinks')sidebarLinks: SidebarLinks;
  sidebarOpen: boolean;
  isMobile: boolean;
  linkClasses = {
    heading: 'list-group-item heading',
    dropdown: 'list-group-item dropdown',
    link: 'list-group-item'
  };

  @HostListener('window:resize')
  onResize() {
    this.setMobile();
  }

  ngOnInit() {
    this.setMobile();
  }

  ngAfterViewInit() {
    for (const link of this.sidebarLinks.links) {
      if (link.type === SidebarLinkTypes.DROPDOWN) {
        link.dropdownHeight = link.children.length * 47.33;
      }
    }
  }

  toggleDropdown(link: SidebarLink) {
    link.dropdownShow = !link.dropdownShow;
  }

  private setMobile() {
    this.isMobile = window.innerWidth < 992;
  }
}
