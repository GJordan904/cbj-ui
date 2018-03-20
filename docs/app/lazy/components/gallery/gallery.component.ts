import { Component, ViewChild } from '@angular/core';
import { CbjGalleryComponent } from '../../../../../cbj-ui/gallery';

@Component({
  selector: 'cbj-gallery-demo',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  @ViewChild(CbjGalleryComponent) gallery: CbjGalleryComponent;
  placeholders = [
    'http://via.placeholder.com/350x150',
    'http://via.placeholder.com/450x250',
    'http://via.placeholder.com/100x100',
    'http://via.placeholder.com/150x150',
    'http://via.placeholder.com/250x150',
    'http://via.placeholder.com/100x100',
    'http://via.placeholder.com/150x150',
    'http://via.placeholder.com/250x150'
  ];

  addUrl = '';

  constructor() { }

  addItem() {
    const urls = this.addUrl.split(',');
    this.gallery.addItems(urls);
  }
}
