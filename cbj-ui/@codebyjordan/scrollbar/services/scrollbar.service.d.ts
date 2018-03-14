import { ElementRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';
import { WindowService } from './window.service';
export declare class ScrollbarService implements OnDestroy {
    private ws;
    private doc;
    scrollObs: Observable<number>;
    scrollPos: number;
    childScrolling: boolean;
    scrollSubj: Subject<number>;
    private _scrollHeight;
    private ngUnsubscribe;
    constructor(ws: WindowService, doc: Document);
    scrollHeight: number;
    ngOnDestroy(): void;
    initWheel(el: HTMLElement): Observable<any>;
    initDrag(el: HTMLElement, bar: HTMLElement): {
        start: Observable<any>;
        end: Observable<any>;
        move: Observable<any>;
    };
    /**
     * Get an elements distance in pixels from the top
     *
     * @returns {number}
     */
    getElOffsetTop(el: ElementRef): number;
    /**
     * Get an elements distance in pixels from the bottom
     *
     * @returns {number}
     */
    getElOffsetBottom(el: ElementRef): number;
}