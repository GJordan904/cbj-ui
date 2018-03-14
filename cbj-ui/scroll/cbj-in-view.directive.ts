import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {ScrollbarService, WindowService} from '../@codebyjordan/scrollbar';
import {ManageVisibility} from './manage-visibility.class';

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
