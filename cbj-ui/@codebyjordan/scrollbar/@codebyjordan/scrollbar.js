import { Directive, ElementRef, Inject, Injectable, InjectionToken, Input, NgModule, Optional, Renderer2 } from '@angular/core';
import { Observable as Observable$1 } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subject as Subject$1 } from 'rxjs/Subject';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';
import { CommonModule, DOCUMENT } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavigationStart, Router } from '@angular/router';

/**
 * The default Scrollbar options
 *
 */
const DEFAULT_SCROLLBAR = {
    isRoot: false,
    position: 'right',
    alwaysVisible: false,
    visibleTimeout: 3000,
    gridOffset: 0,
    barOffset: '.5rem',
    styles: {
        grid: {
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
        },
        bar: {
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
    },
    classes: {
        wrapper: ['cbj-scroll-wrapper'],
        grid: ['cbj-scroll-grid'],
        bar: ['cbj-scroll-bar']
    }
};

/**
 * \@class ScrollbarConfig
 *
 */
class ScrollbarConfig {
    /**
     * @param {?} opt
     */
    constructor(opt) {
        this.mergeOptions(opt, true);
    }
    /**
     * Merge the defaults and options by performing a deep merge
     *
     *
     * @param {?} opt
     * @param {?=} setOpt
     * @param {?=} mergeWith
     * @return {?}
     */
    mergeOptions(opt, setOpt = false, mergeWith) {
        let /** @type {?} */ defaults = DEFAULT_SCROLLBAR;
        if (mergeWith) {
            defaults = mergeWith;
        }
        let /** @type {?} */ styles = {};
        let /** @type {?} */ classes = {};
        // Perform a deep merge of the styles objects if user passes any
        if (opt.styles) {
            const /** @type {?} */ keys = Object.keys(opt.styles);
            for (const /** @type {?} */ key of keys) {
                styles[key] = Object.assign({}, defaults.styles[key], opt.styles[key]);
            }
            styles = Object.assign({}, defaults.styles, styles);
        }
        else {
            styles = Object.assign({}, defaults.styles);
        }
        // Concatenate any user defined classes with the defaults
        if (opt.classes) {
            const /** @type {?} */ keys = Object.keys(opt.classes);
            for (const /** @type {?} */ key of keys) {
                classes[key] = [...defaults.classes[key], ...opt.classes[key]];
            }
            classes = Object.assign({}, defaults.classes, classes);
        }
        else {
            classes = Object.assign({}, defaults.classes);
        }
        const /** @type {?} */ out = Object.assign({}, defaults, opt, { styles }, { classes });
        if (setOpt) {
            this.options = out;
        }
        return out;
    }
    /**
     *
     * @return {?}
     */
    get isRoot() {
        return this.options.isRoot;
    }
    /**
     *
     * @return {?}
     */
    get position() {
        return this.options.position;
    }
    /**
     *
     * @return {?}
     */
    get alwaysVisible() {
        return this.options.alwaysVisible;
    }
    /**
     *
     * @return {?}
     */
    get visibleTimeout() {
        return this.options.visibleTimeout;
    }
    /**
     *
     * @return {?}
     */
    get gridOffset() {
        return this.options.gridOffset;
    }
    /**
     *
     * @return {?}
     */
    get barOffset() {
        return this.options.barOffset;
    }
    /**
     *
     * @return {?}
     */
    get toggleClasses() {
        return this.options.toggleClasses;
    }
    /**
     *
     * @return {?}
     */
    get wStyles() {
        return this.options.styles.wrapper;
    }
    /**
     *
     * @return {?}
     */
    get gStyles() {
        return this.options.styles.grid;
    }
    /**
     *
     * @return {?}
     */
    get bStyles() {
        return this.options.styles.bar;
    }
    /**
     *
     * @return {?}
     */
    get wClass() {
        return this.options.classes.wrapper;
    }
    /**
     *
     * @return {?}
     */
    get gClass() {
        return this.options.classes.grid;
    }
    /**
     *
     * @return {?}
     */
    get bClass() {
        return this.options.classes.bar;
    }
}

const WINDOW = new InjectionToken('Window');
/**
 * @return {?}
 */
function _window() { return window; }

class WindowService {
    /**
     * @param {?} w
     */
    constructor(w) {
        this.w = w;
        this.resizeObs = Observable$1.fromEvent(w, 'resize');
    }
    /**
     * Get the browsers window object
     *
     * @return {?}
     */
    get window() {
        return this.w;
    }
    /**
     * Get the width of the window
     *
     * @return {?}
     */
    get width() {
        return this.w.innerWidth;
    }
    /**
     * Return whether device is on a screen < 992px wide
     *
     * @return {?}
     */
    get isMobile() {
        return this.width < 992;
    }
    /**
     * Get the height of the window
     *
     * @return {?}
     */
    get height() {
        return this._height ? this._height : this.w.innerHeight;
    }
    /**
     * Set the height of the window
     *
     * @param {?} height
     * @return {?}
     */
    set height(height) {
        this._height = height;
    }
}
WindowService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
WindowService.ctorParameters = () => [
    { type: Window, decorators: [{ type: Inject, args: [WINDOW,] },] },
];

class ScrollbarService {
    /**
     * @param {?} ws
     * @param {?} doc
     */
    constructor(ws, doc) {
        this.ws = ws;
        this.doc = doc;
        this.scrollSubj = new Subject$1();
        this.ngUnsubscribe = new Subject$1();
        this.scrollObs = Observable$1.from(this.scrollSubj);
        this.childScrolling = false;
    }
    /**
     * @return {?}
     */
    get scrollHeight() {
        return this._scrollHeight ? this._scrollHeight : this.doc.documentElement.scrollHeight;
    }
    /**
     * @param {?} height
     * @return {?}
     */
    set scrollHeight(height) {
        this._scrollHeight = height;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
    /**
     * @param {?} el
     * @return {?}
     */
    initWheel(el) {
        const /** @type {?} */ dommousescroll = Observable$1.fromEvent(el, 'DOMMouseScroll');
        const /** @type {?} */ mousewheel = Observable$1.fromEvent(el, 'mousewheel');
        const /** @type {?} */ wheel = Observable$1.fromEvent(el, 'wheel');
        return Observable$1.merge(...[dommousescroll, mousewheel, wheel])
            .map((e) => {
            e.preventDefault();
            const /** @type {?} */ data = { x: 0, y: 0, type: 'wheel' };
            if (e.wheelDelta) {
                data.y = -1 / 40 * e.wheelDelta;
                data.x = e.wheelDeltaX ? -1 / 40 * e.wheelDeltaX : 0;
            }
            else {
                data.y = e.deltaY || e.detail;
            }
            return data;
        });
    }
    /**
     * @param {?} el
     * @param {?} bar
     * @return {?}
     */
    initDrag(el, bar) {
        let /** @type {?} */ observs;
        const /** @type {?} */ mousemove = Observable$1.fromEvent(this.ws.window, 'mousemove');
        const /** @type {?} */ mousedown = Observable$1.fromEvent(bar, 'mousedown');
        const /** @type {?} */ mouseup = Observable$1.fromEvent(this.ws.window, 'mouseup');
        const /** @type {?} */ mousedrag = mousedown.mergeMap((e) => {
            const /** @type {?} */ pageY = e.pageY;
            const /** @type {?} */ top = parseFloat(getComputedStyle(bar).top);
            return mousemove.map((emove) => {
                emove.preventDefault();
                return top + emove.pageY - pageY;
            }).takeUntil(mouseup);
        });
        observs = {
            start: mousedrag,
            end: mouseup,
            move: mousemove
        };
        if (this.ws.isMobile) {
            const /** @type {?} */ touchmove = Observable$1.fromEvent(this.ws.window, 'touchmove');
            const /** @type {?} */ touchstart = Observable$1.fromEvent(el, 'touchstart');
            const /** @type {?} */ touchend = Observable$1.fromEvent(this.ws.window, 'touchend');
            const /** @type {?} */ touchdrag = touchstart.mergeMap((e) => {
                const /** @type {?} */ pageY = e.targetTouches[0].pageY;
                const /** @type {?} */ top = -parseFloat(getComputedStyle(bar).top);
                return touchmove.map((tmove) => {
                    return -(top + tmove.targetTouches[0].pageY - pageY);
                }).takeUntil(touchend);
            });
            observs = {
                start: Observable$1.merge(...[mousedrag, touchdrag]),
                end: Observable$1.merge(...[mouseup, touchend]),
                move: Observable$1.merge(...[mousemove, touchstart])
            };
        }
        return observs;
    }
    /**
     * Get an elements distance in pixels from the top
     *
     * @param {?} el
     * @return {?}
     */
    getElOffsetTop(el) {
        const /** @type {?} */ viewportTop = el.nativeElement.getBoundingClientRect().top;
        const /** @type {?} */ clientTop = el.nativeElement.clientTop;
        return viewportTop + this.scrollPos - clientTop;
    }
    /**
     * Get an elements distance in pixels from the bottom
     *
     * @param {?} el
     * @return {?}
     */
    getElOffsetBottom(el) {
        const /** @type {?} */ viewportTop = el.nativeElement.getBoundingClientRect().top;
        const /** @type {?} */ clientBottom = el.nativeElement.clientTop + el.nativeElement.clientHeight;
        return viewportTop + this.scrollPos - clientBottom;
    }
}
ScrollbarService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ScrollbarService.ctorParameters = () => [
    { type: WindowService, },
    { type: Document, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];

const easing = {
    linear: (t) => t,
    inQuad: (t) => t * t,
    outQuad: (t) => t * (2 - t),
    inOutQuad: (t) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    inCubic: (t) => t * t * t,
    outCubic: (t) => (--t) * t * t + 1,
    inOutCubic: (t) => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    inQuart: (t) => t * t * t * t,
    outQuart: (t) => 1 - (--t) * t * t * t,
    inOutQuart: (t) => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
    inQuint: (t) => t * t * t * t * t,
    outQuint: (t) => 1 + (--t) * t * t * t * t,
    inOutQuint: (t) => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
};

class CbjScrollbarDirective {
    /**
     *
     * @param {?} el
     * @param {?} renderer
     * @param {?} scroll
     * @param {?} ws
     * @param {?} doc
     * @param {?} router
     */
    constructor(el, renderer, scroll, ws, doc, router$$1) {
        this.el = el;
        this.renderer = renderer;
        this.scroll = scroll;
        this.ws = ws;
        this.doc = doc;
        this.router = router$$1;
        /**
         * Subject to unsubscribe from Observables
         *
         */
        this.unsubscribe = new Subject$1();
        /**
         * Measure the window and set the bars height
         */
        this.setBarHeight = () => {
            const natEl = this.el.nativeElement;
            this.scrollHeight = Math.round(natEl.scrollHeight);
            const barHeight = (natEl.offsetHeight / natEl.scrollHeight) * natEl.offsetHeight;
            this.renderer.setStyle(this.bar, 'height', `${barHeight}px`);
            if (!this.barNeeded(natEl.offsetHeight, barHeight) ||
                !this.config.alwaysVisible ||
                this.hidden) {
                this.showHideBarGrid();
            }
            if (this.config.isRoot) {
                this.ws.height = natEl.clientHeight;
                this.scroll.scrollHeight = this.scrollHeight;
            }
        };
        /**
         * Toggle a class on one of the 3 created elements
         *
         * @param nxt { {el: string, classes: string, remove: boolean} }
         */
        this.toggleClasses = (nxt) => {
            if (nxt.remove) {
                this.renderer.removeClass(this[nxt.el], nxt.classes);
            }
            else {
                this.renderer.addClass(this[nxt.el], nxt.classes);
            }
        };
        this.showHideBarGrid = () => {
            const /** @type {?} */ natEl = this.el.nativeElement;
            const /** @type {?} */ barHeight = (natEl.offsetHeight / natEl.scrollHeight) * natEl.offsetHeight;
            this.notNeeded = !this.barNeeded(natEl.offsetHeight, barHeight);
            if (!this.hidden) {
                if (this.notNeeded || !this.config.alwaysVisible) {
                    this.renderer.setStyle(this.grid, 'opacity', 0);
                    this.renderer.setStyle(this.bar, 'opacity', 0);
                    this.hidden = true;
                }
            }
            else {
                if (!this.notNeeded) {
                    this.renderer.setStyle(this.grid, 'opacity', 1);
                    this.renderer.setStyle(this.bar, 'opacity', 1);
                    this.hidden = false;
                    if (!this.config.alwaysVisible) {
                        clearTimeout(this.timeout);
                        this.timeout = setTimeout(this.showHideBarGrid, this.config.visibleTimeout);
                    }
                }
            }
        };
        /**
         * Resets the timeout for hiding the scrollbar
         */
        this.resetTime = () => {
            clearTimeout(this.timeout);
            if (this.hidden && !this.notNeeded) {
                this.renderer.setStyle(this.grid, 'opacity', 1);
                this.renderer.setStyle(this.bar, 'opacity', 1);
                this.hidden = false;
            }
            this.timeout = setTimeout(this.showHideBarGrid, this.config.visibleTimeout);
        };
        /**
         * Called on mouse drag while mouse down or called on touch drag while touch down
         *
         */
        this.dragStart = (top) => {
            if (!this.config.isRoot) {
                this.scroll.childScrolling = true;
            }
            if (!this.config.isRoot || (this.config.isRoot && this.scroll.childScrolling === false)) {
                this.renderer.setStyle(this.bar, 'top', `${top}px`);
                this.scrollContent();
            }
        };
        this.scrollContent = () => {
            const /** @type {?} */ natEl = this.el.nativeElement;
            const /** @type {?} */ maxTop = natEl.offsetHeight - this.bar.offsetHeight;
            let /** @type {?} */ percentScroll;
            let /** @type {?} */ delta = parseInt(getComputedStyle(this.bar).top, 10);
            delta = Math.min(Math.max(delta, 0), maxTop);
            delta = Math.floor(delta);
            this.renderer.setStyle(this.bar, 'top', delta + 'px');
            percentScroll = parseInt(getComputedStyle(this.bar).top, 10) / (natEl.offsetHeight - this.bar.offsetHeight);
            delta = percentScroll * (natEl.scrollHeight - natEl.offsetHeight);
            natEl.scrollTop = delta;
            if (this.config.isRoot) {
                this.scroll.scrollPos = delta;
                this.scroll.scrollSubj.next(delta);
            }
        };
        /**
         * Called on drag-end event
         */
        this.dragEnd = () => {
            const natEl = this.el.nativeElement;
            const paddingTop = parseInt(natEl.style.paddingTop, 10);
            const paddingBottom = parseInt(natEl.style.paddingBottom, 10);
            if (paddingTop > 0 || paddingBottom > 0) {
                this.scrollTo(0, 300, 'inOutCubic');
            }
            if (!this.config.isRoot) {
                this.scroll.childScrolling = false;
            }
        };
        this.scrollWheel = (event) => {
            if (!this.config.isRoot) {
                this.scroll.childScrolling = true;
            }
            const /** @type {?} */ natEl = this.el.nativeElement;
            const /** @type {?} */ start = Date.now();
            const /** @type {?} */ maxTop = natEl.offsetHeight - this.bar.offsetHeight;
            let /** @type {?} */ percentScroll;
            let /** @type {?} */ delta;
            const /** @type {?} */ scroll = () => {
                const /** @type {?} */ currentTime = Date.now();
                const /** @type {?} */ time = Math.min(1, ((currentTime - start) / 200));
                const /** @type {?} */ easedTime = easing.inOutQuad(time);
                delta = parseInt(getComputedStyle(this.bar).top, 10) + event.y * easedTime;
                delta = Math.min(Math.max(delta, 0), maxTop);
                delta = (event.y > 0) ? Math.ceil(delta) : Math.floor(delta);
                this.renderer.setStyle(this.bar, 'top', delta + 'px');
                percentScroll = parseInt(getComputedStyle(this.bar).top, 10) / (natEl.offsetHeight - this.bar.offsetHeight);
                delta = percentScroll * (natEl.scrollHeight - natEl.offsetHeight);
                natEl.scrollTop = delta;
                if (this.config.isRoot) {
                    this.scroll.scrollPos = delta;
                    this.scroll.scrollSubj.next(delta);
                }
                if (time < 1) {
                    requestAnimationFrame(scroll);
                }
                if (!this.config.isRoot) {
                    this.scroll.childScrolling = false;
                }
            };
            if (!this.config.isRoot || (this.config.isRoot && this.scroll.childScrolling === false)) {
                requestAnimationFrame(scroll);
            }
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Start Working
        this.createScrollbar();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // Wait 250ms or else scrollbar breaks on page load in FF, then calculate and set the bar height
        setTimeout(this.setBarHeight, 250);
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        // Check if scrollHeight has changed and recalculate bar height if so
        const /** @type {?} */ dif = this.scrollHeight !== Math.round(this.el.nativeElement.scrollHeight);
        if (dif) {
            this.setBarHeight();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // do some cleanup and unsubscribe from our Observables
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
    /**
     * @return {?}
     */
    createScrollbar() {
        this.setParentsStyles();
        this.setElementStyle();
        this.renderWrapper();
        this.renderGrid();
        this.renderBar();
        this.subscribe();
    }
    /**
     * Here we set the hosts parent to position relative
     * Additionally, to prevent a scrollbar from appearing in FF, we set the body to overflow hidden
     * @return {?}
     */
    setParentsStyles() {
        const /** @type {?} */ natEl = this.el.nativeElement;
        const /** @type {?} */ parent = this.renderer.parentNode(natEl);
        this.renderer.setStyle(parent, 'position', 'relative');
        const /** @type {?} */ body = this.doc.getElementsByTagName('BODY')[0];
        this.renderer.setStyle(body, 'overflow', 'hidden');
    }
    /**
     * Sets styles on host element
     *
     * @return {?}
     */
    setElementStyle() {
        const /** @type {?} */ natEl = this.el.nativeElement;
        this.renderer.setStyle(natEl, 'overflow', 'hidden');
    }
    /**
     * Creates, configures, and inserts wrapper element
     * The wrapper will go around all elements, including the host element
     *
     * Element Properties
     * -- classes defined in config. \@default: 'cbj-scroll-wrapper'
     * -- margin and height are obtained from the host element
     * -- width set to 100% to fix issue in FF where content did not fill available space
     * -- styles defined in config. \@default: {}
     * @return {?}
     */
    renderWrapper() {
        // Get ref to containing div and create element
        const /** @type {?} */ natEl = this.el.nativeElement;
        this.wrapper = this.renderer.createElement('div');
        // Add Classes
        for (const /** @type {?} */ cls of this.config.wClass) {
            this.renderer.addClass(this.wrapper, cls);
        }
        // Set Dynamic Styles. Wait 250ms since FF was too fast & height was still undefined
        setTimeout(() => {
            this.renderer.setStyle(this.wrapper, 'margin', getComputedStyle(natEl).margin);
            this.renderer.setStyle(this.wrapper, 'height', getComputedStyle(natEl).height);
        }, 250);
        // Set Other Styles
        this.renderer.setStyle(this.wrapper, 'width', '100%'); // Fixes issue in FF
        for (const /** @type {?} */ prop in this.config.wStyles) {
            if (this.config.wStyles.hasOwnProperty(prop)) {
                this.renderer.setStyle(this.wrapper, prop, this.config.wStyles[prop]);
            }
        }
        // Insert the wrapper before the host el and then move the host and its contents inside the wrapper
        this.renderer.insertBefore(this.renderer.parentNode(natEl), this.wrapper, natEl);
        this.renderer.appendChild(this.wrapper, natEl);
    }
    /**
     * Creates, configures, and inserts grid element
     * The grid is the element placed behind the scrollbar. It goes from the top to the bottom of the wrapper
     *
     * ElementProperties
     * -- classes defined in config \@default: 'cbj-scroll-grid'
     * -- config.position set to config.gridOffset \@default: 'right': 0
     * -- opacity set to 0 if alwaysVisible false
     * -- styles set in config \@default: {
     * 'position': 'absolute',
     * 'top': 0,
     * 'bottom': 0,
     * 'display': 'block',
     * 'cursor': 'pointer',
     * 'z-index': 99999,
     * 'background': 'transparent',
     * 'width': '1rem',
     * 'border-radius': 0,
     * 'margin': 0,
     * 'transition': 'opacity 250ms ease-in-out'
     * }
     *
     * @return {?}
     */
    renderGrid() {
        // Create element
        this.grid = this.renderer.createElement('div');
        // Add Classes
        for (const /** @type {?} */ cls of this.config.gClass) {
            this.renderer.addClass(this.grid, cls);
        }
        // Set Styles
        this.renderer.setStyle(this.grid, this.config.position, this.config.gridOffset);
        for (const /** @type {?} */ prop in this.config.gStyles) {
            if (this.config.gStyles.hasOwnProperty(prop)) {
                this.renderer.setStyle(this.grid, prop, this.config.gStyles[prop]);
            }
        }
        // Hide grid if alwaysVisible not set
        if (!this.config.alwaysVisible) {
            this.renderer.setStyle(this.grid, 'opacity', 0);
        }
        // Insert the element
        this.renderer.appendChild(this.wrapper, this.grid);
    }
    /**
     * Creates, configures, and inserts bar element
     *
     * ElementProperties
     * -- classes defined in config \@default: 'cbj-scroll-bar'
     * -- config.position set to config.gridOffset \@default: 'right': '.5rem'
     * -- transform set to translate3d([50% | -50%], 0, 0) to center the bar. translate3d used to work on the gpu
     * -- opacity set to 0 if alwaysVisible false
     * -- styles set in config \@default: {
     * 'position': 'absolute',
     * 'top': 0,
     * 'display': 'block',
     * 'cursor': 'pointer',
     * 'transition': 'opacity 250ms ease-in-out',
     * 'z-index': 100000,
     * 'background': '#495057',
     * 'width': '.7rem',
     * 'border-radius': '10px',
     * 'margin': 0
     * }
     *
     * @return {?}
     */
    renderBar() {
        // Create element
        this.bar = this.renderer.createElement('div');
        // Add Classes
        for (const /** @type {?} */ cls of this.config.bClass) {
            this.renderer.addClass(this.bar, cls);
        }
        // Center the bar in the grid. Using translate3d to utilize gpu
        const /** @type {?} */ translate = this.config.position === 'right' ? 'translate3d(50%, 0, 0)' : 'translate3d(-50%, 0, 0)';
        this.renderer.setStyle(this.bar, 'transform', translate);
        // Set Styles
        this.renderer.setStyle(this.bar, this.config.position, this.config.barOffset);
        for (const /** @type {?} */ prop in this.config.bStyles) {
            if (this.config.bStyles.hasOwnProperty(prop)) {
                this.renderer.setStyle(this.bar, prop, this.config.bStyles[prop]);
            }
        }
        // Hide bar if alwaysVisible not set
        if (!this.config.alwaysVisible) {
            this.renderer.setStyle(this.bar, 'opacity', 0);
            this.hidden = true;
        }
        else {
            this.hidden = false;
        }
        // Insert the element
        this.renderer.appendChild(this.wrapper, this.bar);
    }
    /**
     * Subscribe to all the Observables
     * @return {?}
     */
    subscribe() {
        const /** @type {?} */ natEl = this.el.nativeElement;
        const /** @type {?} */ drag = this.scroll.initDrag(natEl, this.bar);
        this.scroll.initWheel(natEl)
            .takeUntil(this.unsubscribe)
            .subscribe(this.scrollWheel);
        this.ws.resizeObs.takeUntil(this.unsubscribe).subscribe(this.setBarHeight);
        drag.start.takeUntil(this.unsubscribe).subscribe(this.dragStart);
        drag.end.takeUntil(this.unsubscribe).subscribe(this.dragEnd);
        if (!this.config.alwaysVisible) {
            drag.move.takeUntil(this.unsubscribe).subscribe(this.resetTime);
        }
        if (this.config.isRoot && this.router) {
            this.router.events
                .filter(event => event instanceof NavigationStart)
                .subscribe((e) => {
                this.scrollTo(0, 100, 'linear');
            });
        }
        if (this.config.toggleClasses) {
            Observable$1.from(this.config.toggleClasses)
                .takeUntil(this.unsubscribe)
                .subscribe(this.toggleClasses);
        }
    }
    /**
     * Checks difference between bar height and content height. returns true if bar is needed
     *
     *
     * @param {?} elHeight
     * @param {?} barHeight
     * @return {?}
     */
    barNeeded(elHeight, barHeight) {
        return Math.round(elHeight) - Math.round(barHeight) > 2;
    }
    /**
     * @param {?} y
     * @param {?} duration
     * @param {?} easingFunc
     * @return {?}
     */
    scrollTo(y, duration, easingFunc) {
        const /** @type {?} */ natEl = this.el.nativeElement;
        const /** @type {?} */ start = Date.now();
        const /** @type {?} */ from$$1 = natEl.scrollTop;
        const /** @type {?} */ maxElScrollTop = natEl.scrollHeight - natEl.clientHeight;
        const /** @type {?} */ barHeight = Math.max((natEl.offsetHeight / natEl.scrollHeight) * natEl.offsetHeight, 30);
        const /** @type {?} */ paddingTop = parseInt(natEl.style.paddingTop, 10) || 0;
        const /** @type {?} */ paddingBottom = parseInt(natEl.style.paddingBottom, 10) || 0;
        const /** @type {?} */ scroll = () => {
            const /** @type {?} */ currentTime = Date.now();
            const /** @type {?} */ time = Math.min(1, ((currentTime - start) / duration));
            const /** @type {?} */ easedTime = easing[easingFunc](time);
            if (paddingTop > 0 || paddingBottom > 0) {
                let /** @type {?} */ fromY = null;
                if (paddingTop > 0) {
                    fromY = -paddingTop;
                    fromY = -((easedTime * (y - fromY)) + fromY);
                    this.renderer.setStyle(natEl, 'paddingTop', `${fromY}px`);
                }
                if (paddingBottom > 0) {
                    fromY = paddingBottom;
                    fromY = ((easedTime * (y - fromY)) + fromY);
                    this.renderer.setStyle(natEl, 'paddingBottom', `${fromY}px`);
                }
            }
            else {
                natEl.scrollTop = (easedTime * (y - from$$1)) + from$$1;
            }
            const /** @type {?} */ percentScroll = natEl.scrollTop / maxElScrollTop;
            if (paddingBottom === 0) {
                const /** @type {?} */ delta = Math.round(Math.round(natEl.clientHeight * percentScroll) - barHeight);
                if (delta > 0) {
                    this.renderer.setStyle(this.bar, 'top', `${delta}px`);
                }
                else {
                    this.renderer.setStyle(this.bar, 'top', `0`);
                }
            }
            if (time < 1) {
                requestAnimationFrame(scroll);
            }
        };
        requestAnimationFrame(scroll);
    }
}
CbjScrollbarDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cbjScrollbar]'
            },] },
];
/**
 * @nocollapse
 */
CbjScrollbarDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: ScrollbarService, },
    { type: WindowService, },
    { type: Document, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: Router, decorators: [{ type: Optional },] },
];
CbjScrollbarDirective.propDecorators = {
    'config': [{ type: Input, args: ['cbjScrollbar',] },],
};

class CbjScrollbarModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: CbjScrollbarModule,
            providers: [
                { provide: WINDOW, useFactory: _window },
                WindowService,
                ScrollbarService
            ]
        };
    }
}
CbjScrollbarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    CbjScrollbarDirective
                ],
                exports: [
                    CbjScrollbarDirective
                ]
            },] },
];
/**
 * @nocollapse
 */
CbjScrollbarModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { DEFAULT_SCROLLBAR, ScrollbarConfig, WINDOW, _window, WindowService, ScrollbarService, CbjScrollbarDirective, CbjScrollbarModule, CbjScrollbarDirective as ɵa, ScrollbarService as ɵb, WindowService as ɵc, WINDOW as ɵd, _window as ɵe };
//# sourceMappingURL=scrollbar.js.map
