import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[cbjMenuItem]'
})
export class CbjMenuItemDirective implements OnInit{
  @Input('cbjMenuItem')label: string;
  active = false;

  constructor(private el: ElementRef) { }

  ngOnInit() {
      this.el.nativeElement.classList.add('cbj-menu-item');
  }
}
