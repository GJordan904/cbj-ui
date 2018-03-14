import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CbjUiModule } from '@codebyjordan/ui';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  imports: [
    CommonModule,
    CbjUiModule,
  ],
  declarations: [
    HighlightDirective
  ],
  exports: [
    CommonModule,
    CbjUiModule,
    HighlightDirective
  ]
})
export class CbjCommonModule { }
