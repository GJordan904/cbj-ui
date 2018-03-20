import {NgModule} from '@angular/core';
import {CbjCardTabsComponent} from './card-tabs/cbj-card-tabs.component';
import {CbjCardTabComponent} from './card-tabs/cbj-card-tab.component';
import {CommonModule} from '@angular/common';
import {CbjRippleModule} from '../ripple/index';

@NgModule({
  imports: [
    CommonModule,
    CbjRippleModule,
  ],
  declarations: [
    CbjCardTabsComponent,
    CbjCardTabComponent,
  ],
  exports: [
    CbjCardTabsComponent,
    CbjCardTabComponent,
  ]
})
export class CbjNavsModule {
  
}
