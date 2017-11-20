import {ModuleWithProviders, NgModule} from '@angular/core';
import {CardTabsComponent} from './card-tabs/card-tabs.component';
import {CardTabComponent} from './card-tabs/card-tab.component';
import {CommonModule} from '@angular/common';
import { ElInViewDirective } from './directives/el-in-view.directive';
import { AnimInViewComponent } from './anim-in-view/anim-in-view.component';
import { ParallaxDirective } from './directives/parallax/parallax.directive';
import {BytesTransform} from './pipes/bytes-transform.pipe';
import {ScrollService} from './services/scroll.service';
import {AppContainerComponent} from './app-drawer/app-container.component';
import {RippleDirective} from './directives/ripple.directive';
import {RouterModule} from '@angular/router';
import {DatatableComponent} from './datatable/datatable.component';
import {CbjMenuComponent} from './menu/menu.component';
import {CbjMenuItemDirective} from './menu/menu-item.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    CardTabsComponent,
    CardTabComponent,
    ElInViewDirective,
    AnimInViewComponent,
    ParallaxDirective,
    BytesTransform,
    AppContainerComponent,
    RippleDirective,
    DatatableComponent,
    CbjMenuComponent,
    CbjMenuItemDirective,
  ],
  exports: [
    CardTabsComponent,
    CardTabComponent,
    ElInViewDirective,
    AnimInViewComponent,
    ParallaxDirective,
    BytesTransform,
    AppContainerComponent,
    RippleDirective,
    DatatableComponent,
    CbjMenuComponent,
    CbjMenuItemDirective,
  ],
  providers: [ScrollService]
})
export class UiModule {
  constructor() { }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UiModule,
      providers: [ ScrollService ]
    };
  }
}
