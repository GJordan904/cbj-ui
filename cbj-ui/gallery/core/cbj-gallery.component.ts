import {
  AfterViewInit, Component, ElementRef, EventEmitter, Input,
  OnDestroy, OnInit, Output, QueryList, ViewChild, ViewChildren
} from '@angular/core';
import { CbjGalleryItemComponent } from './cbj-gallery-item.component';


@Component({
  selector: 'cbj-gallery',
  templateUrl: './cbj-gallery.component.html'
})
export class CbjGalleryComponent implements OnInit, AfterViewInit, OnDestroy {
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
   * An array of image links
   *
   * @type {string[]} images
   */
  @Input('images')images: string[];
  /**
   * An array of classes to add to the img tags
   *
   * @type {string[]} classes
   */
  @Input('classes')classes: string[] = [];
  /**
   * The generated gallery items
   *
   * @type {QueryList<CbjGalleryItemComponent>} items
   */
  @ViewChildren(CbjGalleryItemComponent)items = new QueryList<CbjGalleryItemComponent>();
  /**
   * The click event emitter for broadcasting the click events on the images
   *
   * @type {EventEmitter<{ i: CbjGalleryItemComponent, e: Event }>} imgClick
   */
  @Output('imgClick')imgClick: EventEmitter<{ i: CbjGalleryItemComponent, e: Event }>;
  /**
   * The element wrapping all the items
   *
   * @type {ElementRef} wrapper
   */
  @ViewChild('wrapper')wrapper: ElementRef;

  /**
   * An array of heights of each column
   *
   * @private
   * @type {number[]}
   */
  private colHeights: number[] = [];
  /**
   * The number of columns in a row
   *
   * @private
   * @type {number}  colsPerRow
   */
  private colsPerRow: number;
  /**
   * The column currently being inserted into
   *
   * @private
   * @type {number}  curCol
   */
  private curCol: number;
  /**
   * The row currently adding columns to
   *
   * @private
   * @type {number}  curCol
   */
  private curRow: number;

  /**
   * OnInit
   * Setup the EventEmitter
   */
  ngOnInit() {
    this.imgClick = new EventEmitter<{ i: CbjGalleryItemComponent, e: Event }>();
  }

  /**
   * AfterViewInit
   * Wait a tick to make sure all vals are set
   * Make our measurement to calc how many cols per row
   * Position the items
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.gutterWidth = this.gutterWidth ? this.gutterWidth : 30;
      this.colsPerRow = this.colWidth <= 1 ?
        Math.floor(this.colWidth * this.wrapper.nativeElement.clientWidth) :
        Math.round(this.wrapper.nativeElement.clientWidth / (this.colWidth + this.gutterWidth)) - 1;
      this.curCol = 0;
      this.curRow = 0;
      this.createLayout();
      this.items.changes.subscribe(this.addToLayout);
    }, 0);
  }

  /**
   * OnDestroy
   * Cleanup the emitter
   */
  ngOnDestroy() {
    this.imgClick.next(null);
    this.imgClick.complete();
  }

  /**
   * Emit our click event
   *
   * @param {{ i: CbjGalleryItemComponent, e: Event }} arg
   */
  emitClick = (arg: { i: CbjGalleryItemComponent, e: Event }) => {
    this.imgClick.next({ i: arg.i, e: arg.e });
  }

  /**
   * Use to add items to the gallery after creation
   *
   * @param {string[]} images
   */
  addItems(images: string[]) {
    for (const image of images) {
      this.images.push(image);
    }
  }

  /**
   * Position the items in the gallery AfterViewInit
   *
   */
  private createLayout() {
    this.items.toArray().forEach((it: CbjGalleryItemComponent) => {
      this.setItemDims(it);
    });
    for (let i = 0; i < this.items.length; i++) {
      const insert = this.items.filter(item => item.column === undefined)[0];
      this.positionItem(insert);
    }
  }

  /**
   * Add items to an existing gallery
   */
  private addToLayout = () => {
    setTimeout(() => {
      this.items
        .filter(item => item.id === undefined)
        .forEach((item: CbjGalleryItemComponent) => {
          this.setItemDims(item);
          this.positionItem(item);
        });
    }, 0);
  }

  /**
   * Calculate and set the items dimensions
   *
   * @param {CbjGalleryItemComponent} it
   */
  private setItemDims(it: CbjGalleryItemComponent) {
    const w = (this.colWidth - this.gutterWidth);
    it.width = w + 'px';
    it.height = Math.round(w * this.getRatio(it.el)) + 'px';
    it.state = 'sized';
  }

  /**
   * Calculates aspect-ratio
   *
   * @param {ElementRef} el
   *
   * @returns {number}
   */
  private getRatio(el: ElementRef) {
    const img = el.nativeElement.firstChild;
    return img.naturalHeight / img.naturalWidth;
  }

  /**
   * Positions an individual item
   *
   * @param {CbjGalleryItemComponent} it
   */
  private positionItem(it: CbjGalleryItemComponent) {
    it.left = this.findLeft();
    it.top = this.findTop(it);
    setTimeout(() => it.state = 'positioned', 0);
    it.column = this.curCol;
    it.id = this.curCol + (this.colsPerRow * this.curRow);
    this.incrementColRow();
  }

  /**
   * Calculates the left property for an item
   *
   * @returns {string}
   */
  private findLeft() {
    let left: string;

    if  (this.curCol === 0) {
      left = this.gutterWidth / 2 + 'px';
    }else {
      const padCols = (this.colWidth * this.curCol) + (this.curCol * this.gutterWidth);
      left = padCols + 'px';
    }

    return  left;
  }

  /**
   * Calculates the top position of an item
   *
   * @param {CbjGalleryItemComponent} it
   *
   * @returns {string}
   */
  private findTop(it: CbjGalleryItemComponent) {
    let top = this.gutterWidth / 2;

    if (typeof this.colHeights[this.curCol] === 'undefined') {
      console.log(it.height);
      this.colHeights[this.curCol] = parseInt(it.height, 10) + this.gutterWidth;
    } else {
      top += this.colHeights[this.curCol];
      this.colHeights[this.curCol] += parseInt(it.height, 10) + this.gutterWidth;
    }

    return top + 'px';
  }

  /**
   * Increments curCol or sets to 0 if on last column in row
   * Increments row number if at last col
   */
  private incrementColRow() {
    if (this.curCol >= this.colsPerRow) {
      this.curCol = 0;
      this.curRow++;
    }else {
     this.curCol++;
    }
  }

  private rePosition(start: number) {
    this.curCol = start;
    this.items
      .filter(item => item.column >= start)
      .forEach((it: CbjGalleryItemComponent) => {
        this.positionItem(it);
      });
  }
}
