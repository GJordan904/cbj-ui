import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CbjDatatableComponent } from './cbj-datatable.component';
import { CbjScrollModule } from '../scroll/index';
import { CbjMenuModule } from '../menu/index';
import { CbjCompCellDirective } from './cbj-component-cell.directive';
import { CbjLinkCellComponent } from './cbj-link-cell.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CbjMenuModule,
    CbjScrollModule
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
