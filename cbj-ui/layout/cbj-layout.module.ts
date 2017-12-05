import {NgModule} from '@angular/core';
import {CbjLayoutComponent} from './cbj-layout.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CbjRippleModule} from '../ripple';
import {CbjScrollModule} from '../scroll';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CbjRippleModule,
    CbjScrollModule
  ],
  declarations: [
    CbjLayoutComponent
  ],
  exports: [
    CbjLayoutComponent
  ]
})
export class CbjLayoutModule {
  
}
