import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CbjButtonComponent } from './cbj-button.component';
import { RouterModule } from '@angular/router';
import { CbjRippleModule } from '../ripple';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CbjRippleModule
  ],
  declarations: [
    CbjButtonComponent
  ],
  exports: [
    CbjButtonComponent
  ]
})
export class CbjButtonModule {

}
