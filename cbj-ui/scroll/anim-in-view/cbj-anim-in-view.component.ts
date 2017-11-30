import {AfterViewInit, Component, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'cbj-anim-in-view',
  template: '<div cbjInView (show)="show($event)" [ngClass]="setClasses"><ng-content></ng-content></div>'
})
export class CbjAnimInViewComponent implements AfterViewInit {
  @Input('classes')classes: string;
  visible = false;
  setClasses: {};

  constructor() { }

  ngAfterViewInit(): void {
    this.setClass();
  }

  show(el: ElementRef) {
    this.visible = true;
  }

  setClass() {
    this.setClasses = {
      'animated': this.visible,
      [this.classes]: this.visible,
      'invisible': !this.visible
    };
  }
}
