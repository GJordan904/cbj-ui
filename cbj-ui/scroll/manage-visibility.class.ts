import {Subject} from 'rxjs/Subject';
import {ScrollService, WindowService} from '../services';
import {AfterViewInit, ElementRef, OnDestroy, OnInit} from '@angular/core';

export class ManageVisibility implements OnInit, AfterViewInit, OnDestroy {
  eivVisible: boolean;
  offsetTop: number;
  ngUnsubscribe = new Subject<void>();

  constructor(public el: ElementRef, public scroll: ScrollService, public window: WindowService) { }

  ngOnInit(): void {
    this.eivVisible = false;
    this.offsetTop = this.window.getOffsetTop(this.el);
  }

  ngAfterViewInit(): void {
    this.manageVisibility();

    this.scroll.scrollObs.takeUntil(this.ngUnsubscribe)
      .subscribe(() => this.manageVisibility());

    this.window.resizeObs.takeUntil(this.ngUnsubscribe)
      .subscribe(() => this.manageVisibility());
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * check for visibility of element
   */
  manageVisibility(): void {

  }

}
