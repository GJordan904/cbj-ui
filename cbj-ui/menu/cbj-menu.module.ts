import { NgModule } from '@angular/core';
import {CbjMenuComponent} from './cbj-menu.component';
import {CommonModule} from '@angular/common';
import { CbjRippleModule } from '../ripple/index';
import { CbjButtonModule } from '../buttons/index';

@NgModule({
  imports: [
    CommonModule,
    CbjButtonModule,
    CbjRippleModule
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