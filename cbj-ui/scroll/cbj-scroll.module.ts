import { NgModule } from '@angular/core';
import {CbjScrollbarDirective} from './cbj-scrollbar.directive';
import {CbjInViewDirective} from './cbj-in-view.directive';
import {CbjParallaxDirective} from './cbj-parallax.directive';
import {CbjAnimInViewComponent} from './anim-in-view/cbj-anim-in-view.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    CbjScrollbarDirective,
    CbjInViewDirective,
    CbjAnimInViewComponent,
    CbjParallaxDirective,
  ],
  exports: [
    CbjScrollbarDirective,
    CbjInViewDirective,
    CbjAnimInViewComponent,
    CbjParallaxDirective,
  ]
})
export class CbjScrollModule {
}
