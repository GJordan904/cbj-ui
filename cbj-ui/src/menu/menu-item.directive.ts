import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[cbjMenuItem]'
})
export class CbjMenuItemDirective implements OnInit {
  @Input('cbjMenuItem')label: string;
  @Input('cbjMenuClick')cbjMenuClick: Function;

  private _active = false;
  @Input()
  get active(): boolean {
    return this._active;
  }
  set active(active: boolean) {
    this._active = active;
    if (active) {
      this.renderer.addClass(this.el.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'active');
    }
  }

  @HostListener('click')
  onClick() {
    this.active = true;
    if (this.cbjMenuClick !== undefined) {
      this.cbjMenuClick();
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
      this.renderer.addClass(this.el.nativeElement, 'cbj-menu-item');
  }
}
