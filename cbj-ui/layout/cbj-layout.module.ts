import {NgModule} from '@angular/core';
import {CbjLayoutComponent} from './cbj-layout.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CbjRippleModule} from '../ripple';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CbjRippleModule
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
