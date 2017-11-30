import {Directive, ElementRef, Input} from '@angular/core';
import {ScrollService} from '../services/scroll.service';
import {ManageVisibility} from './manage-visibility.class';
import {ParallaxConfig} from '../models/scroll.models';

@Directive({
  selector: '[cbjParallax]'
})
export class CbjParallaxDirective extends ManageVisibility {
  @Input('cbjParallax')config: ParallaxConfig;

  constructor(public el: ElementRef, public scroll: ScrollService) {
    super(el, scroll);
  }

  ngOnInit() {
    const DEFAULTS = {
      startPosition: 0,
      ratio: .5,
      cssUnit: 'px',
      maxValue: 0,
      minValue: 0
    };
    this.config = {
      ...DEFAULTS,
      ...this.config,
    };
    super.ngOnInit();
  }

  /**
   * check for visibility of element
   */
  manageVisibility(): void {
    const winHeight = this.scroll.getWinHeight();

    const scrollTrigger = this.offsetTop - winHeight;

    if (!this.eivVisible && this.scroll.pos >= scrollTrigger) {
      this.eivVisible = true;

    }

    if(this.eivVisible) {
      let resultVal: string;
      let calcVal: number;

      calcVal = ((this.scroll.pos * this.config.ratio) + this.config.startPosition) *  -1;

      if (this.config.maxValue && calcVal >= this.config.maxValue) {
        calcVal = this.config.maxValue;
      } else if (this.config.minValue && calcVal <= this.config.minValue) {
        calcVal = this.config.minValue;
      }

      // added after realizing original setup wasn't compatible in Firefox
      // debugger;
      resultVal = 'center calc(50% + ' + calcVal + this.config.cssUnit + ')';

      this.el.nativeElement.style['backgroundPosition'] = resultVal;
    }

    if (this.eivVisible && this.scroll.pos < scrollTrigger) {
      this.eivVisible = false;
    }
  }
}
