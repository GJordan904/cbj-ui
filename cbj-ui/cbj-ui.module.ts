import { ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders, NgModule } from '@angular/core';
import { CbjScrollModule, ScrollbarService, WINDOW, _window, WindowService } from './scroll/index';
import { CbjButtonModule } from './buttons/index';
import { CbjDatatableModule, CbjLinkCellComponent } from './datatable/index';
import { CbjNavsModule } from './navs/index';
import { CbjLayoutModule } from './layout/index';
import { CbjPipesModule } from './pipes/index';
import { CbjRippleModule } from './ripple/index';
import { CbjMenuModule } from './menu/index';
import { CbjGalleryModule } from './gallery/index';

@NgModule({
  exports: [
    CbjScrollModule,
    CbjRippleModule,
    CbjButtonModule,
    CbjMenuModule,
    CbjNavsModule,
    CbjPipesModule,
    CbjDatatableModule,
    CbjLayoutModule,
    CbjGalleryModule,
  ]
})
export class CbjUiModule {
  constructor () { }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CbjUiModule,
      providers: [
        { provide: WINDOW, useFactory: _window },
        WindowService,
        ScrollbarService,
        {provide: ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: [CbjLinkCellComponent]}
      ]
    };
  }
}
