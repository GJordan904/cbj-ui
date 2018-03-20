import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CbjLayoutComponent } from './cbj-layout.component';
import {CbjRippleModule } from '../ripple/index';
import { CbjScrollModule } from '../scroll/index';

@NgModule({
  imports: [
    CommonModule,
    CbjScrollModule,
    CbjRippleModule,
    RouterModule,
  ],
  declarations: [
    CbjLayoutComponent
  ],
  exports: [
    CbjLayoutComponent,
  ]
})
export class CbjLayoutModule { }
