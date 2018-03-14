import { Component, HostListener, Input, OnInit } from '@angular/core';
import { RippleConfig } from '../ripple';

@Component({
  selector: 'cbj-button',
  templateUrl: './cbj-button.component.html'
})
export class CbjButtonComponent {
  @Input('link')link: string;
  @Input('raised')raised: boolean;
  @Input('text')text: string;
  @Input('btnClasses')btnClasses: string[];
  @Input('rippleConf')rippleConf: RippleConfig;

  classes() {
    return  [ ...this.btnClasses, 'btn', this.raised ? 'btn-raised' : 'btn-flat' ];
  }
}
