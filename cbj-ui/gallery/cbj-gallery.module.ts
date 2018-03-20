import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CbjGalleryItemComponent } from './core/cbj-gallery-item.component';
import { CbjGalleryComponent } from './core/cbj-gallery.component';
import { CbjFilterGalleryComponent } from './filterable/cbj-filter-gallery.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    CbjGalleryItemComponent,
    CbjGalleryComponent,
    CbjFilterGalleryComponent,
  ],
  exports: [
    CbjGalleryItemComponent,
    CbjGalleryComponent,
    CbjFilterGalleryComponent,
  ]
})
export class CbjGalleryModule { }
