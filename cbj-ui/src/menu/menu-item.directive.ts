import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[cbjMenuItem]'
})
export class CbjMenuItemDirective implements OnInit {
  @Input('cbjMenuItem')label: string;

  private _active = false;
  @Input()
  get active(): boolean {
    return this._active;
  }
  set active(active: boolean) {
    console.log('setting active');
    this._active = active;
    if (active) {
      console.log('active');
      this.renderer.addClass(this.el.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'active');
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
      this.renderer.addClass(this.el.nativeElement, 'cbj-menu-item');
  }
}
