import {
  AfterViewChecked, Directive, ElementRef, Input, OnDestroy, OnInit,
  Renderer2
} from '@angular/core';
import {ScrollBarOptions} from '../models';
import {ScrollService} from '../services';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {easing} from '../animations';

const DEFAULT_SCROLLBAR: ScrollBarOptions = {
  isRoot: false,
  position: 'right',
  barBackground: '#004FFF',
  barOpacity: .75,
  barWidth: '.7rem',
  barBorderRadius: '10px',
  barMargin: '0',
  wrapperClass: '',
  gridBackground: '#14213D',
  gridOpacity: .85,
  gridWidth: '1rem',
  gridBorderRadius: '0',
  gridMargin: '0',
  alwaysVisible: false,
  visibleTimeout: 3000
};

@Directive({
  selector: '[cbjScrollbar]'
})
export class CbjScrollbarDirective implements OnInit, AfterViewChecked, OnDestroy {
  @Input('cbjScrollbar')options: ScrollBarOptions;

  private config: ScrollBarOptions;
  private wrapper: HTMLElement;
  private grid: HTMLElement;
  private bar: HTMLElement;
  private timeout: number;
  private hidden: boolean;
  private unsubscribe = new Subject<void>();

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private scroll: ScrollService) { }

  ngOnInit() {
    this.config = {...DEFAULT_SCROLLBAR, ...this.options};
    this.createScrollbar();
  }

  ngAfterViewChecked() {
    this.setBarHeight();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private createScrollbar() {
    this.setElementStyle();
    this.renderWrapper();
    this.renderGrid();
    this.renderBar();
    this.subscribe();

    if (!this.config.alwaysVisible) {
      this.hidden = false;
      this.timeout = setTimeout(this.showHideBarGrid, this.config.visibleTimeout);
    }
  }

  private setElementStyle(): void {
    const el = this.el.nativeElement;
    this.renderer.setStyle(el, 'overflow', 'hidden');
    this.renderer.setStyle(el, 'position', 'relative');
    this.renderer.setStyle(el, 'display', 'block');
  }

  private renderWrapper(): void {
    const el = this.el.nativeElement;
    this.wrapper = this.renderer.createElement('div');

    this.renderer.addClass(this.wrapper, 'cbj-scroll-wrapper');
    this.renderer.setStyle(this.wrapper, 'position', 'relative');
    this.renderer.setStyle(this.wrapper, 'overflow', 'hidden');
    this.renderer.setStyle(this.wrapper, 'display', 'inline-block');
    this.renderer.setStyle(this.wrapper, 'margin', getComputedStyle(el).margin);
    this.renderer.setStyle(this.wrapper, 'width', '100%');
    this.renderer.setStyle(this.wrapper, 'height', getComputedStyle(el).height);

    this.renderer.insertBefore(this.renderer.parentNode(el), this.wrapper, el);
    this.renderer.appendChild(this.wrapper, el);
  }

  private renderGrid(): void {
    this.grid = this.renderer.createElement('div');

    this.renderer.addClass(this.grid, 'cbj-scroll-grid');
    this.renderer.setStyle(this.grid, 'position', 'absolute');
    this.renderer.setStyle(this.grid, 'top', '0');
    this.renderer.setStyle(this.grid, 'bottom', '0');
    this.renderer.setStyle(this.grid, this.config.position, '0');
    this.renderer.setStyle(this.grid, 'width', this.config.gridWidth);
    this.renderer.setStyle(this.grid, 'background', this.config.gridBackground);
    this.renderer.setStyle(this.grid, 'opacity', this.config.gridOpacity);
    this.renderer.setStyle(this.grid, 'display', 'block');
    this.renderer.setStyle(this.grid, 'cursor', 'pointer');
    this.renderer.setStyle(this.grid, 'z-index', '99');
    this.renderer.setStyle(this.grid, 'border-radius', this.config.gridBorderRadius);
    this.renderer.setStyle(this.grid, 'margin', this.config.gridMargin);
    this.renderer.setStyle(this.grid, 'background', this.config.gridBackground);

    this.renderer.appendChild(this.wrapper, this.grid);
  }

  private renderBar(): void {
    this.bar = this.renderer.createElement('div');

    const translate =  this.config.position === 'right' ? 'translateX(50%)' : 'translateX(-50%)';

    this.renderer.addClass(this.bar, 'cbj-scroll-bar');
    this.renderer.setStyle(this.bar, 'position', 'absolute');
    this.renderer.setStyle(this.bar, 'top', '0');
    this.renderer.setStyle(this.bar, this.config.position, '.5rem');
    this.renderer.setStyle(this.bar, 'width', this.config.barWidth);
    this.renderer.setStyle(this.bar, 'background', this.config.barBackground);
    this.renderer.setStyle(this.bar, 'opacity', this.config.barOpacity);
    this.renderer.setStyle(this.bar, 'display', 'block');
    this.renderer.setStyle(this.bar, 'cursor', 'pointer');
    this.renderer.setStyle(this.bar, 'z-index', '100');
    this.renderer.setStyle(this.bar, 'border-radius', this.config.barBorderRadius);
    this.renderer.setStyle(this.bar, 'margin', this.config.barMargin);
    this.renderer.setStyle(this.bar, 'transform', translate);
    this.renderer.setStyle(this.bar, 'background', this.config.barBackground);

    this.renderer.appendChild(this.wrapper, this.bar);
  }

  private setBarHeight(): void {
    const el = this.el.nativeElement;
    const barHeight = Math.max((el.offsetHeight / el.scrollHeight) * el.offsetHeight, 30) + 'px';
    const display = parseInt(barHeight, 10) === el.offsetHeight ? 'none' : 'block';

    this.renderer.setStyle(this.bar, 'height', barHeight);
    this.renderer.setStyle(this.bar, 'display', display);
    this.renderer.setStyle(this.grid, 'display', display);
  }

  private subscribe(): void {
    const el = this.el.nativeElement;
    const drag = this.scroll.initDrag(el, this.bar, this.config.alwaysVisible ? undefined : this.resetTime);

    this.scroll.initWheel(el)
      .takeUntil(this.unsubscribe)
      .subscribe(this.scrollContent);

    this.scroll.resizeObs.takeUntil(this.unsubscribe).subscribe(() => {
      this.setBarHeight();
      if (this.config.isRoot) {
        this.scroll.scrollHeight = el.offsetHeight;
      }
    });

    drag.start.takeUntil(this.unsubscribe).subscribe(this.dragStart);

    drag.end.takeUntil(this.unsubscribe).subscribe(this.dragEnd);
  }

  private showHideBarGrid(): void {
    if (this.hidden) {
      this.hidden = false;
      this.renderer.addClass(this.grid, 'show');
      this.renderer.addClass(this.bar, 'show');
      this.timeout = setTimeout(this.showHideBarGrid, this.config.visibleTimeout);
    }else {
      this.hidden = true;
      this.renderer.removeClass(this.grid, 'show');
      this.renderer.removeClass(this.bar, 'show');
    }
  }

  private resetTime(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.showHideBarGrid, this.config.visibleTimeout);
  }

  private scrollContent = (event: {x: number, y: number, type: string}) => {
    const el = this.el.nativeElement;
    const maxTop = el.offsetHeight - this.bar.offsetHeight;
    let percentScroll: number;
    let over = null;
    let delta = event.y;

    if (event.type === 'wheel') {
      delta = parseInt(getComputedStyle(this.bar).top, 10) + event.y * 5 / 100 * this.bar.offsetHeight;

      if (delta < 0 || delta > maxTop) {
        over = delta > maxTop ? delta - maxTop : delta;
      }

      delta = Math.min(Math.max(delta, 0), maxTop);
      delta = (event.y > 0) ? Math.ceil(delta) : Math.floor(delta);
      this.renderer.setStyle(this.bar, 'top', delta + 'px');
    }

    percentScroll = parseInt(getComputedStyle(this.bar).top, 10) / (el.offsetHeight - this.bar.offsetHeight);
    delta = percentScroll * (el.scrollHeight - el.offsetHeight);

    el.scrollTop = delta;

    if (this.config.isRoot) {
      this.scroll.scrollPos = delta;
      this.scroll.scrollSubj.next(delta);
    }

    return over;
  }

  private dragStart = (top: number) => {
    const el = this.el.nativeElement;
    this.renderer.setStyle(this.bar, 'top', `${top}px`);
    const over = this.scrollContent({x: 0, y: 0, type: 'drag'});
    const maxTop = el.offsetHeight - this.bar.offsetHeight;

    if (over && over < 0 && -over <= maxTop) {
      this.renderer.setStyle(el, 'paddingTop', -over + 'px');
    } else if (over && over > 0 && over <= maxTop) {
      this.renderer.setStyle(el, 'paddingBottom', over + 'px');
    }
  }

  private dragEnd = () => {
    const el = this.el.nativeElement;
    const paddingTop = parseInt(el.style.paddingTop, 10);
    const paddingBottom = parseInt(el.style.paddingBottom, 10);

    if (paddingTop > 0) {
      this.scrollTo(0, 300, 'linear');
    } else if (paddingBottom > 0) {
      this.scrollTo(0, 300, 'linear');
    }
  }

  private scrollTo(y: number, duration: number, easingFunc: string): void {
    const el = this.el.nativeElement;
    const start = Date.now();
    const from = el.scrollTop;
    const maxElScrollTop = el.scrollHeight - el.clientHeight;
    const barHeight = Math.max((el.offsetHeight / el.scrollHeight) * el.offsetHeight, 30);
    const paddingTop = parseInt(el.style.paddingTop, 10) || 0;
    const paddingBottom = parseInt(el.style.paddingBottom, 10) || 0;

    const scroll = (timestamp: number) => {
      const currentTime = Date.now();
      const time = Math.min(1, ((currentTime - start) / duration));
      const easedTime = easing[easingFunc](time);

      if (paddingTop > 0 || paddingBottom > 0) {
        let fromY = null;

        if (paddingTop > 0) {
          fromY = -paddingTop;
          fromY = -((easedTime * (y - fromY)) + fromY);
          this.renderer.setStyle(el, 'paddingTop', `${fromY}px`);
        }

        if (paddingBottom > 0) {
          fromY = paddingBottom;
          fromY = ((easedTime * (y - fromY)) + fromY);
          this.renderer.setStyle(el, 'paddingBottom', `${fromY}px`);
        }
      } else {
        el.scrollTop = (easedTime * (y - from)) + from;
      }

      const percentScroll = el.scrollTop / maxElScrollTop;
      if (paddingBottom === 0) {
        const delta = Math.round(Math.round(el.clientHeight * percentScroll) - barHeight);
        if (delta > 0) {
          this.renderer.setStyle(this.bar, 'top', `${delta}px`);
        }
      }

      if (time < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  }
}
