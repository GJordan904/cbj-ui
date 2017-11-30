import {NgModule} from '@angular/core';
import {CbjDatatableComponent} from './cbj-datatable.component';
import {CommonModule} from '@angular/common';
import {CbjMenuModule} from '../menu/cbj-menu.module';

@NgModule({
  imports: [
    CommonModule,
    CbjMenuModule
  ],
  declarations: [
    CbjDatatableComponent
  ],
  exports: [
    CbjDatatableComponent
  ]
})
export class CbjDatatableModule {

}