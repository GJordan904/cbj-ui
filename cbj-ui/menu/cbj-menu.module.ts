import { NgModule } from '@angular/core';
import {CbjMenuComponent} from './cbj-menu.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    CbjMenuComponent
  ],
  exports: [
    CbjMenuComponent
  ]
})
export class CbjMenuModule {
}