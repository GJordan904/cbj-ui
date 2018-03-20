import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {ScrollbarService } from '../services/scrollbar.service';
import { WindowService} from '../services/window.service';
import {ManageVisibility} from '../models/manage-visibility.class';

@Directive({
  selector: '[cbjInView]'
})
export class CbjInViewDirective extends ManageVisibility {
  @Output('show') show = new EventEmitter<ElementRef>();

  constructor(public el: ElementRef, public scroll: ScrollbarService, public window: WindowService) {
    super(el, scroll, window);
  }

  /**
   * check for visibility of element
   */
  manageVisibility(): void {
    const winHeight = this.window.height;

    const scrollTrigger = this.offsetTop + 150 - winHeight;

    if (!this.eivVisible && this.scroll.scrollPos >= scrollTrigger) {
      this.eivVisible = true;
      this.show.emit(this.el);
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
  }

}
