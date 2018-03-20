import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CbjInViewDirective } from './directives/cbj-in-view.directive';
import { CbjParallaxDirective } from './directives/cbj-parallax.directive';
import { CbjScrollbarDirective } from './directives/scrollbar.directive';
import { CbjAnimInViewComponent } from './anim-in-view/cbj-anim-in-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CbjInViewDirective,
    CbjAnimInViewComponent,
    CbjParallaxDirective,
    CbjScrollbarDirective,
  ],
  exports: [
    CbjInViewDirective,
    CbjAnimInViewComponent,
    CbjParallaxDirective,
    CbjScrollbarDirective,
  ]
})
export class CbjScrollModule {}

