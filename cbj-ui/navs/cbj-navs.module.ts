import {NgModule} from '@angular/core';
import {CbjCardTabsComponent} from './card-tabs/cbj-card-tabs.component';
import {CbjCardTabComponent} from './card-tabs/cbj-card-tab.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
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
