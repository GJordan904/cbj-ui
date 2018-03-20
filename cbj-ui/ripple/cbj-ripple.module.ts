import {NgModule} from '@angular/core';
import {CbjRippleDirective} from './cbj-ripple.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    CbjRippleDirective
  ],
  exports: [
    CbjRippleDirective
  ]
})
export class CbjRippleModule {

}
