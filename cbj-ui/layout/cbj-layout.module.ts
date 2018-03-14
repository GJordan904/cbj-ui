import { ModuleWithProviders, NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CbjLayoutComponent} from './cbj-layout.component';
import {CbjRippleModule} from '../ripple';
import {CbjScrollModule} from '../scroll';
import { ScrollbarService, WINDOW, _window, WindowService } from '../@codebyjordan/scrollbar';

@NgModule({
  imports: [
    CommonModule,
    CbjScrollModule,
    CbjRippleModule,
    RouterModule,
  ],
  declarations: [
    CbjLayoutComponent
  ],
  exports: [
    CbjLayoutComponent,
  ]
})
export class CbjLayoutModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CbjLayoutModule,
      providers: [
        { provide: WINDOW, useFactory: _window },
        WindowService,
        ScrollbarService
      ]
    };
  }
}
