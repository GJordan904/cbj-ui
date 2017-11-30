import {AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[cbjRipple]'
})
export class CbjRippleDirective implements OnInit, AfterViewInit {
  @Input('cbjRipple')options: any;
  config: any;
  rippleContainer: HTMLElement;
  animating: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('touchstart', ['$event'])
  onTouchStart(e: TouchEvent) {
    this.rippleStart(e);
  }

  @HostListener('click', ['$event'])
  onMouseDown(e: MouseEvent) {
    this.rippleStart(e);
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(e: MouseEvent) {
    this.rippleEnd(e);
  }

  @HostListener('transitionend', ['$event'])
  onTransitionEnd(e: MouseEvent) {
    this.rippleEnd(e);
  }

  ngOnInit() {
    const defaults = {
      cxlOnMove: true,
      color: 'white',
      opacity: 0.25,
      shadow: 'none',
      expandTime: .25,
      collapseTime: .4,
      size: 0
    };
    this.config = {
      ...defaults,
      ...this.options,
    };
    this.animating = false;
  }

  ngAfterViewInit() {
    this.setInitStyles();
    this.createContainer();
  }

  private setInitStyles() {
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.addClass(this.el.nativeElement, 'cbj-ripple');
  }

  private createContainer() {
    const size = this.config.size ? this.config.size : Math.max(this.el.nativeElement.offsetHeight, this.el.nativeElement.offsetWidth);

    this.rippleContainer = this.renderer.createElement('div');
    this.renderer.setStyle(this.rippleContainer, 'transition', `transform ${this.config.expandTime}s ease-in-out`);
    this.renderer.setStyle(this.rippleContainer, 'height', `${size}px`);
    this.renderer.setStyle(this.rippleContainer, 'width', `${size}px`);
    this.renderer.setStyle(this.rippleContainer, 'display', 'block');
    this.renderer.setStyle(this.rippleContainer, 'border-radius', '100%');
    this.renderer.setStyle(this.rippleContainer, 'position', 'absolute');
    this.renderer.setStyle(this.rippleContainer, 'transform', 'scale(0)');
    this.renderer.setStyle(this.rippleContainer, 'background-color', this.config.color);
    this.renderer.appendChild(this.el.nativeElement, this.rippleContainer);
  }

  private rippleStart(e: MouseEvent | TouchEvent) {
    if (!this.animating) {
      this.animating = true;
      const size = this.config.size ? this.config.size : Math.max(this.el.nativeElement.offsetWidth, this.el.nativeElement.offsetHeight);
      let pageX;
      let pageY;
      if (e instanceof MouseEvent) {
        pageX = e.offsetX;
        pageY = e.offsetY;
      }else {
        pageX = e.touches[0].clientX;
        pageY = e.touches[0].clientY;
      }
      const x = pageX -  size / 2;
      const y = pageY - size / 2;


      this.renderer.setStyle(this.rippleContainer, 'top', `${y}px`);
      this.renderer.setStyle(this.rippleContainer, 'left', `${x}px`);
      this.renderer.setStyle(this.rippleContainer, 'opacity', this.config.opacity);
      this.renderer.setStyle(this.rippleContainer, 'background-color', this.config.color);
      this.renderer.setStyle(this.rippleContainer, 'boxShadow', this.config.shadow);
      this.renderer.setStyle(this.rippleContainer, 'transform', `scale(2.5)`);
    }
  }

  private rippleEnd(e: MouseEvent | TouchEvent) {
    if (this.animating) {
      this.animating = false;
      this.renderer.setStyle(this.rippleContainer, 'boxShadow', 'none');
      this.renderer.setStyle(this.rippleContainer, 'transform', `scale(0)`);
    }
  }
}
