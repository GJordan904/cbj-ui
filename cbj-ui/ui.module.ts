import {ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders, NgModule, Optional, Provider, SkipSelf} from '@angular/core';
import {ScrollService, WINDOW, WindowService} from './services';
import {CbjScrollModule} from './scroll';
import {CbjMenuModule} from './menu';
import {CbjPipesModule} from './pipes';
import {CbjRippleModule} from './ripple';
import {CbjDatatableModule, CbjLinkCellComponent} from './datatable';
import {CbjNavsModule} from './navs';
import {CbjLayoutModule} from './layout';
import {CbjUiConfig} from './models';
import {CommonModule} from '@angular/common';

@NgModule({
  exports: [
    CbjMenuModule,
    CbjScrollModule,
    CbjPipesModule,
    CbjRippleModule,
    CbjDatatableModule,
    CbjNavsModule,
    CbjLayoutModule
  ]
})
export class CbjUiModule {
  constructor (@Optional() @SkipSelf() parentModule: CbjUiModule) {
    if (parentModule) {
      throw new Error(
        'CbjUiModule is already loaded. Import it with the forRoot method in the AppModule only');
    }
  }

  static forRoot(config?: CbjUiConfig): ModuleWithProviders {
    const providers: Provider[] = [
      ScrollService,
      WindowService,
      {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: [CbjLinkCellComponent], multi: true},
      {provide: WINDOW, useValue: window}
    ];

    if (config) {
      if (config.tableComponents) {
        providers.push({provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: config.tableComponents, multi: true});
      }
    }

    return {
      ngModule: CbjUiModule,
      providers: providers
    };
  }
}
