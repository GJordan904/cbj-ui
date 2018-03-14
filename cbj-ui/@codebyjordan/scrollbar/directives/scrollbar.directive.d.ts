import { AfterViewChecked, AfterViewInit, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';
import { ScrollbarConfig } from '../models/scrolbar-config';
import { WindowService } from '../services/window.service';
import { ScrollbarService } from '../services/scrollbar.service';
export declare class CbjScrollbarDirective implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
    private el;
    private renderer;
    private scroll;
    private ws;
    private doc;
    private router;
    /**
     * The scrollbars configuration object
     *
     * @type {ScrollbarConfig}
     */
    config: ScrollbarConfig;
    /**
     * The wrapper Element
     *
     * @type {HTMLElement}
     */
    private wrapper;
    /**
     * The grid Element
     *
     * @type {HTMLElement}
     */
    private grid;
    /**
     * The bar Element
     *
     * @type {HTMLElement}
     */
    private bar;
    /**
     * The height of the scrollable content.
     *
     * @type {number}
     */
    private scrollHeight;
    /**
     * The timeout for hiding the scrollbar
     *
     * @type {number | timeout}
     */
    private timeout;
    /**
     * Indicates whether the scrollbar needs to be shown
     *
     * @type {boolean}
     */
    private notNeeded;
    /**
     * Indicates whether the scrollbar is hidden
     *
     * @type {boolean}
     */
    private hidden;
    /**
     * Subject to unsubscribe from Observables
     *
     * @type {Subject<void>}
     */
    private unsubscribe;
    /**
     * @constructor
     *
     * @param {ElementRef} el
     * @param {Renderer2} renderer
     * @param {ScrollbarService} scroll
     * @param {WindowService} ws
     * @param {Document} doc
     * @param {Router} router
     */
    constructor(el: ElementRef, renderer: Renderer2, scroll: ScrollbarService, ws: WindowService, doc: Document, router: Router);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    private createScrollbar();
    /**
     * Here we set the hosts parent to position relative
     * Additionally, to prevent a scrollbar from appearing in FF, we set the body to overflow hidden
     */
    private setParentsStyles();
    /**
     * Sets styles on host element
     *
     */
    private setElementStyle();
    /**
     * Creates, configures, and inserts wrapper element
     * The wrapper will go around all elements, including the host element
     *
     * Element Properties
     * -- classes defined in config. @default: 'cbj-scroll-wrapper'
     * -- margin and height are obtained from the host element
     * -- width set to 100% to fix issue in FF where content did not fill available space
     * -- styles defined in config. @default: {}
     */
    private renderWrapper();
    /**
     * Creates, configures, and inserts grid element
     * The grid is the element placed behind the scrollbar. It goes from the top to the bottom of the wrapper
     *
     * ElementProperties
     * -- classes defined in config @default: 'cbj-scroll-grid'
     * -- config.position set to config.gridOffset @default: 'right': 0
     * -- opacity set to 0 if alwaysVisible false
     * -- styles set in config @default: {
                                            'position': 'absolute',
                                            'top': 0,
                                            'bottom': 0,
                                            'display': 'block',
                                            'cursor': 'pointer',
                                            'z-index': 99999,
                                            'background': 'transparent',
                                            'width': '1rem',
                                            'border-radius': 0,
                                            'margin': 0,
                                            'transition': 'opacity 250ms ease-in-out'
                                          }
     *
     */
    private renderGrid();
    /**
     * Creates, configures, and inserts bar element
     *
     * ElementProperties
     * -- classes defined in config @default: 'cbj-scroll-bar'
     * -- config.position set to config.gridOffset @default: 'right': '.5rem'
     * -- transform set to translate3d([50% | -50%], 0, 0) to center the bar. translate3d used to work on the gpu
     * -- opacity set to 0 if alwaysVisible false
     * -- styles set in config @default: {
                                            'position': 'absolute',
                                            'top': 0,
                                            'display': 'block',
                                            'cursor': 'pointer',
                                            'transition': 'opacity 250ms ease-in-out',
                                            'z-index': 100000,
                                            'background': '#495057',
                                            'width': '.7rem',
                                            'border-radius': '10px',
                                            'margin': 0
                                          }
     *
     */
    private renderBar();
    /**
     * Measure the window and set the bars height
     */
    private setBarHeight;
    /**
     * Subscribe to all the Observables
     */
    private subscribe();
    /**
     * Toggle a class on one of the 3 created elements
     *
     * @param nxt { {el: string, classes: string, remove: boolean} }
     */
    private toggleClasses;
    private showHideBarGrid;
    /**
     * Checks difference between bar height and content height. returns true if bar is needed
     *
     * @param {number} elHeight
     * @param {number} barHeight
     *
     * @returns {boolean} calculated bar height is less than the height of content + 2px
     */
    private barNeeded(elHeight, barHeight);
    /**
     * Resets the timeout for hiding the scrollbar
     */
    private resetTime;
    /**
     * Called on mouse drag while mouse down or called on touch drag while touch down
     *
     * @param {number} top
     */
    private dragStart;
    private scrollContent;
    /**
     * Called on drag-end event
     */
    private dragEnd;
    private scrollWheel;
    private scrollTo(y, duration, easingFunc);
}
