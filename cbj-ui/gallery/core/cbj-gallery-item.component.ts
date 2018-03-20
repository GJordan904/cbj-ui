import { AfterViewChecked, Component, ElementRef, Input } from '@angular/core';
import { moveToAnimation } from '../../animations/index';

@Component({
  selector: 'cbj-gallery-item',
  template: `<img [@moveTo]="{value: state, params: { st: '100%', sl: '15px', et: top, el: left} }" 
                  [src]="src" 
                  (click)="onClick($event)" 
                  [ngClass]="classes" 
                  [style.top]="top" 
                  [style.left]="left"
                  [style.height]="height"
                  [style.width]="width">`,
  styles: ['img { position: absolute; }'],
  animations: [
    moveToAnimation()
  ]
})
export class CbjGalleryItemComponent {
  @Input('clickE') clickE: (arg: { i: CbjGalleryItemComponent, e: Event }) => {};
  @Input('classes') classes: string[];
  @Input('src') src: string;

  // Variables set/changed by the gallery component
  @Input() id: number;
  @Input() state = 'hidden';
  @Input() column: number;
  @Input() height: string;
  @Input() width: string;
  @Input() top = '100%';
  @Input() left = '0px';

  onClick(e: Event) {
    this.clickE({i: this, e: e});
    console.log('clicked: ', this);
  }

  constructor(public el: ElementRef) {}
}


