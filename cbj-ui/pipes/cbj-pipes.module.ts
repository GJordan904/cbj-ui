import {NgModule} from '@angular/core';
import {BytesTransformPipe} from './bytes-transform.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    BytesTransformPipe
  ],
  exports: [
    BytesTransformPipe
  ]
})
export class CbjPipesModule {

}
