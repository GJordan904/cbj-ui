import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GalleryFilter } from '../cbj-gallery.models';

@Component({
  selector: 'cbj-filter-gallery',
  templateUrl: './cbj-filter-gallery.component.html'
})
export class CbjFilterGalleryComponent implements OnInit {
  /**
   * The galleries height
   *
   * @type {string} height
   */
  @Input('height')height: string;
  /**
   * The galleries width
   *
   * @type {string} width
   */
  @Input('width')width: string;
  /**
   * The columns width in pixels
   *
   * @type {number} colWidth
   */
  @Input('colWidth')colWidth: number;
  /**
   * The width of the space between cols
   *
   * @type {number} gutterWidth
   */
  @Input('gutterWidth')gutterWidth: number;
  /**
   * An array of classes to add to the img tags
   *
   * @type {string[]} classes
   */
  @Input('classes')classes: string[] = [];
  /**
   * The url to get image links from. It must return a response containing an array of image links for the key data
   *
   * @type {string} url
   */
  @Input('url')url: string;
  /**
   * Params to be sent to the image endpoint.
   *
   * @type {any} params
   */
  @Input('params')params: any;
  /**
   * The filters for the gallery
   *
   * @type {GalleryFilter[]} filters
   */
  @Input('filters')filters: GalleryFilter[];
  /**
   * An array of image links to pass to the gallery component
   *
   * @type {string[]} images
   */
  images: string[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getSetImages();
  }

  private getSetImages() {
    this.http.get(this.url, {params: this.params})
      .subscribe((resp: any) => {
        this.images = resp.images;
      });
  }
}
