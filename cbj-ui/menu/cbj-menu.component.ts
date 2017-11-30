import {AfterContentInit, Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {MenuItem} from '../models';
import {collapse} from '../animations';

@Component({
  selector: 'cbj-menu',
  templateUrl: './cbj-menu.component.html',
  animations: [
    collapse(250, 'ease-in-out')
  ]
})
export class CbjMenuComponent implements AfterContentInit {
  @ViewChild('cbjMenuToggle')menuBtn: ElementRef;
  @Input('options') options: {
    arrow: boolean,
    title: string | boolean
  };
  @Input('items') items: Array<MenuItem>;
  toggleClasses: {};
  toggleTitle: string;
  menuState = 'closed';

  constructor() { }

  ngAfterContentInit() {
    if (typeof this.options.title === 'string') {
      this.toggleTitle = this.options.title;
    }else {
      this.clearActive(true);
    }
  }

  toggleMenu(e: FocusEvent) {
    if (e) {
      if (e.relatedTarget) {
        const target = <HTMLElement>e.relatedTarget;
        const test = new RegExp('cbj-menu-item');
        if (test.test(target.className)) {
          return;
        }
      }
      this.menuState = 'closed';
    } else {
      this.menuState = this.menuState === 'open' ? 'closed' : 'open';
    }
  }

  itemClick(item: MenuItem) {
    this.clearActive(false);
    item.active = true;
    this.toggleTitle = item.title;
    item.click(item);
    this.menuState = 'closed';
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

  private clearActive(activateFirst: boolean) {
    this.items.forEach((item, index) => {
      item.active = false;
      if (activateFirst && index === 0) {
        item.active = true;
        this.toggleTitle = item.title;
      }
    });
  }
}
