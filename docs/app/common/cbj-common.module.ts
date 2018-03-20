import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CbjUiModule } from '@codebyjordan/ui';
import { HighlightDirective } from './directives/highlight.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HighlightDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    CbjUiModule,
    HighlightDirective
  ]
})
export class CbjCommonModule { }
