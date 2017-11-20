import {AfterViewInit, Component, Input} from '@angular/core';
import {SidebarLink, SidebarLinks} from '../models/app-drawer.models';

@Component({
  selector: 'cbj-app-container',
  styleUrls: ['./app-container.component.scss'],
  templateUrl: './app-container.component.html'
})
export class AppContainerComponent implements AfterViewInit {
  @Input('navbarClasses')navbarClasses: string;
  @Input('sidebarLinks')sidebarLinks: SidebarLinks;
  sidebarOpen: boolean;

  ngAfterViewInit() {
    for (const link of this.sidebarLinks.links) {
      if (link.dropdown) {
        link.dropdownHeight = link.children.length * 47.33;
      }
    }
  }

  toggleDropdown(link: SidebarLink) {
    link.dropdownShow = !link.dropdownShow;
  }
}
