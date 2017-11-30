import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollService} from './services/scroll.service';
import {RouterModule} from '@angular/router';
import {CbjScrollModule} from './scroll/cbj-scroll.module';
import {CbjMenuModule} from './menu/cbj-menu.module';
import {CbjPipesModule} from './pipes/cbj-pipes.module';
import {CbjRippleModule} from './ripple/cbj-ripple.module';
import {CbjDatatableModule} from './datatable/cbj-datatable.module';
import {CbjNavsModule} from './navs/cbj-navs.module';
import {CbjLayoutModule} from './layout/cbj-layout.module';

@NgModule({
  exports: [
    CbjMenuModule,
    CbjScrollModule,
    CbjPipesModule,
    CbjRippleModule,
    CbjDatatableModule,
    CbjNavsModule,
    CbjLayoutModule
  ],
  providers: [ScrollService]
})
export class CbjUiModule {
  constructor (@Optional() @SkipSelf() parentModule: CbjUiModule) {
    if (parentModule) {
      throw new Error(
        'CbjUiModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CbjUiModule,
      providers: [ ScrollService ]
    };
  }
}
