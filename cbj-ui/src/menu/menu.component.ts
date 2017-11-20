import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {CbjMenuItemDirective} from './menu-item.directive';

@Component({
  selector: 'cbj-menu',
  templateUrl: './menu.component.html'
})
export class CbjMenuComponent implements AfterContentInit {
  @Input('arrow')arrow: boolean;
  @Input('title')title: string | boolean;
  @ContentChildren(CbjMenuItemDirective) items: QueryList<CbjMenuItemDirective>;
  toggleClasses: {};
  toggleTitle: string;

  constructor() { }

  ngAfterContentInit() {
    if (typeof this.title === 'string') {
      this.toggleTitle = this.title;
    }else {
      this.items.toArray().forEach((item, index) => {
        item.active = false;
        if (index === 0) {
          item.active = true;
          this.toggleTitle = item.label;
        }
      });
    }
  }
}
