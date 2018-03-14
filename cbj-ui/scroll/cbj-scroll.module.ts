import { ModuleWithProviders, NgModule } from '@angular/core';
import { CbjScrollbarModule, WINDOW, _window, WindowService, ScrollbarService } from '../@codebyjordan/scrollbar';
import {CbjInViewDirective} from './cbj-in-view.directive';
import {CbjParallaxDirective} from './cbj-parallax.directive';
import {CbjAnimInViewComponent} from './anim-in-view';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    CbjScrollbarModule,
  ],
  declarations: [
    CbjInViewDirective,
    CbjAnimInViewComponent,
    CbjParallaxDirective,
  ],
  exports: [
    CbjScrollbarModule,
    CbjInViewDirective,
    CbjAnimInViewComponent,
    CbjParallaxDirective,
  ]
})
export class CbjScrollModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CbjScrollModule,
      providers: [
        { provide: WINDOW, useFactory: _window },
        WindowService,
        ScrollbarService
      ]
    };
  }
}
