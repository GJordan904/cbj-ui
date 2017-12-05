import {NgModule} from '@angular/core';
import {CbjDatatableComponent} from './cbj-datatable.component';
import {CommonModule} from '@angular/common';
import {CbjMenuModule} from '../menu';
import {RouterModule} from '@angular/router';
import {CbjCompCellDirective} from './cbj-component-cell.directive';
import {CbjLinkCellComponent} from './cbj-link-cell.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CbjMenuModule
  ],
  declarations: [
    CbjDatatableComponent,
    CbjCompCellDirective,
    CbjLinkCellComponent
  ],
  exports: [
    CbjDatatableComponent,
    CbjLinkCellComponent
  ]
})
export class CbjDatatableModule { }
