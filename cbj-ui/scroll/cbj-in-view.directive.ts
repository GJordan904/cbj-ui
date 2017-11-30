import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {ScrollService} from '../services/scroll.service';
import {ManageVisibility} from './manage-visibility.class';

@Directive({
  selector: '[cbjInView]'
})
export class CbjInViewDirective extends ManageVisibility{
  @Output('show') show = new EventEmitter<ElementRef>();

  constructor(public el: ElementRef, public scroll: ScrollService) {
    super(el, scroll);
  }

  /**
   * check for visibility of element
   */
  manageVisibility(): void {
    const winHeight = this.scroll.getWinHeight();

    const scrollTrigger = this.offsetTop + 150 - winHeight;

    if (!this.eivVisible && this.scroll.pos >= scrollTrigger) {
      this.eivVisible = true;
      this.show.emit(this.el);
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
  }

}
