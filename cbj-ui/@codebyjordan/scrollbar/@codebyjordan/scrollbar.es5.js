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
var DEFAULT_SCROLLBAR = {
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
var ScrollbarConfig = (function () {
    /**
     * @param {?} opt
     */
    function ScrollbarConfig(opt) {
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
    ScrollbarConfig.prototype.mergeOptions = function (opt, setOpt, mergeWith) {
        if (setOpt === void 0) { setOpt = false; }
        var /** @type {?} */ defaults = DEFAULT_SCROLLBAR;
        if (mergeWith) {
            defaults = mergeWith;
        }
        var /** @type {?} */ styles = {};
        var /** @type {?} */ classes = {};
        // Perform a deep merge of the styles objects if user passes any
        if (opt.styles) {
            var /** @type {?} */ keys = Object.keys(opt.styles);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                styles[key] = Object.assign({}, defaults.styles[key], opt.styles[key]);
            }
            styles = Object.assign({}, defaults.styles, styles);
        }
        else {
            styles = Object.assign({}, defaults.styles);
        }
        // Concatenate any user defined classes with the defaults
        if (opt.classes) {
            var /** @type {?} */ keys = Object.keys(opt.classes);
            for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
                var key = keys_2[_a];
                classes[key] = defaults.classes[key].concat(opt.classes[key]);
            }
            classes = Object.assign({}, defaults.classes, classes);
        }
        else {
            classes = Object.assign({}, defaults.classes);
        }
        var /** @type {?} */ out = Object.assign({}, defaults, opt, { styles: styles }, { classes: classes });
        if (setOpt) {
            this.options = out;
        }
        return out;
    };
    Object.defineProperty(ScrollbarConfig.prototype, "isRoot", {
        /**
         *
         * @return {?}
         */
        get: function () {
            return this.options.isRoot;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollbarConfig.prototype, "position", {
        /**
         *
         * @return {?}
         */
        get: function () {
            return this.options.position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollbarConfig.prototype, "alwaysVisible", {
        /**
         *
         * @return {?}
         */
        get: function () {
            return this.options.alwaysVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollbarConfig.prototype, "visibleTimeout", {
        /**
         *
         * @return {?}
         */
        get: function () {
            return this.options.visibleTimeout;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollbarConfig.prototype, "gridOffset", {
        /**
         *
         * @return {?}
         */
        get: function () {
            return this.options.gridOffset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollbarConfig.prototype, "barOffset", {
        /**
         *
         * @return {?}
         */
        get: function () {
            return this.options.barOffset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollbarConfig.prototype, "toggleClasses", {
        /**
         *
         * @return {?}
         */
        get: function () {
            return this.options.toggleClasses;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollbarConfig.prototype, "wStyles", {
        /**
         *
         * @return {?}
         */
        get: function () {
            return this.options.styles.wrapper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollbarConfig.prototype, "gStyles", {
        /**
         *
         * @return {?}
         */
        get: function () {
            return this.options.styles.grid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollbarConfig.prototype, "bStyles", {
        /**
         *
         * @return {?}
         */
        get: function () {
            return this.options.styles.bar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollbarConfig.prototype, "wClass", {
        /**
         *
         * @return {?}
         */
        get: function () {
            return this.options.classes.wrapper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollbarConfig.prototype, "gClass", {
        /**
         *
         * @return {?}
         */
        get: function () {
            return this.options.classes.grid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollbarConfig.prototype, "bClass", {
        /**
         *
         * @return {?}
         */
        get: function () {
            return this.options.classes.bar;
        },
        enumerable: true,
        configurable: true
    });
    return ScrollbarConfig;
}());
var WINDOW = new InjectionToken('Window');
/**
 * @return {?}
 */
function _window() { return window; }
var WindowService = (function () {
    /**
     * @param {?} w
     */
    function WindowService(w) {
        this.w = w;
        this.resizeObs = Observable$1.fromEvent(w, 'resize');
    }
    Object.defineProperty(WindowService.prototype, "window", {
        /**
         * Get the browsers window object
         *
         * @return {?}
         */
        get: function () {
            return this.w;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowService.prototype, "width", {
        /**
         * Get the width of the window
         *
         * @return {?}
         */
        get: function () {
            return this.w.innerWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowService.prototype, "isMobile", {
        /**
         * Return whether device is on a screen < 992px wide
         *
         * @return {?}
         */
        get: function () {
            return this.width < 992;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowService.prototype, "height", {
        /**
         * Get the height of the window
         *
         * @return {?}
         */
        get: function () {
            return this._height ? this._height : this.w.innerHeight;
        },
        /**
         * Set the height of the window
         *
         * @param {?} height
         * @return {?}
         */
        set: function (height) {
            this._height = height;
        },
        enumerable: true,
        configurable: true
    });
    return WindowService;
}());
WindowService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
WindowService.ctorParameters = function () { return [
    { type: Window, decorators: [{ type: Inject, args: [WINDOW,] },] },
]; };
var ScrollbarService = (function () {
    /**
     * @param {?} ws
     * @param {?} doc
     */
    function ScrollbarService(ws, doc) {
        this.ws = ws;
        this.doc = doc;
        this.scrollSubj = new Subject$1();
        this.ngUnsubscribe = new Subject$1();
        this.scrollObs = Observable$1.from(this.scrollSubj);
        this.childScrolling = false;
    }
    Object.defineProperty(ScrollbarService.prototype, "scrollHeight", {
        /**
         * @return {?}
         */
        get: function () {
            return this._scrollHeight ? this._scrollHeight : this.doc.documentElement.scrollHeight;
        },
        /**
         * @param {?} height
         * @return {?}
         */
        set: function (height) {
            this._scrollHeight = height;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ScrollbarService.prototype.ngOnDestroy = function () {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    };
    /**
     * @param {?} el
     * @return {?}
     */
    ScrollbarService.prototype.initWheel = function (el) {
        var /** @type {?} */ dommousescroll = Observable$1.fromEvent(el, 'DOMMouseScroll');
        var /** @type {?} */ mousewheel = Observable$1.fromEvent(el, 'mousewheel');
        var /** @type {?} */ wheel = Observable$1.fromEvent(el, 'wheel');
        return Observable$1.merge.apply(Observable$1, [dommousescroll, mousewheel, wheel]).map(function (e) {
            e.preventDefault();
            var /** @type {?} */ data = { x: 0, y: 0, type: 'wheel' };
            if (e.wheelDelta) {
                data.y = -1 / 40 * e.wheelDelta;
                data.x = e.wheelDeltaX ? -1 / 40 * e.wheelDeltaX : 0;
            }
            else {
                data.y = e.deltaY || e.detail;
            }
            return data;
        });
    };
    /**
     * @param {?} el
     * @param {?} bar
     * @return {?}
     */
    ScrollbarService.prototype.initDrag = function (el, bar) {
        var /** @type {?} */ observs;
        var /** @type {?} */ mousemove = Observable$1.fromEvent(this.ws.window, 'mousemove');
        var /** @type {?} */ mousedown = Observable$1.fromEvent(bar, 'mousedown');
        var /** @type {?} */ mouseup = Observable$1.fromEvent(this.ws.window, 'mouseup');
        var /** @type {?} */ mousedrag = mousedown.mergeMap(function (e) {
            var /** @type {?} */ pageY = e.pageY;
            var /** @type {?} */ top = parseFloat(getComputedStyle(bar).top);
            return mousemove.map(function (emove) {
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
            var /** @type {?} */ touchmove_1 = Observable$1.fromEvent(this.ws.window, 'touchmove');
            var /** @type {?} */ touchstart = Observable$1.fromEvent(el, 'touchstart');
            var /** @type {?} */ touchend_1 = Observable$1.fromEvent(this.ws.window, 'touchend');
            var /** @type {?} */ touchdrag = touchstart.mergeMap(function (e) {
                var /** @type {?} */ pageY = e.targetTouches[0].pageY;
                var /** @type {?} */ top = -parseFloat(getComputedStyle(bar).top);
                return touchmove_1.map(function (tmove) {
                    return -(top + tmove.targetTouches[0].pageY - pageY);
                }).takeUntil(touchend_1);
            });
            observs = {
                start: Observable$1.merge.apply(Observable$1, [mousedrag, touchdrag]),
                end: Observable$1.merge.apply(Observable$1, [mouseup, touchend_1]),
                move: Observable$1.merge.apply(Observable$1, [mousemove, touchstart])
            };
        }
        return observs;
    };
    /**
     * Get an elements distance in pixels from the top
     *
     * @param {?} el
     * @return {?}
     */
    ScrollbarService.prototype.getElOffsetTop = function (el) {
        var /** @type {?} */ viewportTop = el.nativeElement.getBoundingClientRect().top;
        var /** @type {?} */ clientTop = el.nativeElement.clientTop;
        return viewportTop + this.scrollPos - clientTop;
    };
    /**
     * Get an elements distance in pixels from the bottom
     *
     * @param {?} el
     * @return {?}
     */
    ScrollbarService.prototype.getElOffsetBottom = function (el) {
        var /** @type {?} */ viewportTop = el.nativeElement.getBoundingClientRect().top;
        var /** @type {?} */ clientBottom = el.nativeElement.clientTop + el.nativeElement.clientHeight;
        return viewportTop + this.scrollPos - clientBottom;
    };
    return ScrollbarService;
}());
ScrollbarService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ScrollbarService.ctorParameters = function () { return [
    { type: WindowService, },
    { type: Document, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
]; };
var easing = {
    linear: function (t) { return t; },
    inQuad: function (t) { return t * t; },
    outQuad: function (t) { return t * (2 - t); },
    inOutQuad: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
    inCubic: function (t) { return t * t * t; },
    outCubic: function (t) { return (--t) * t * t + 1; },
    inOutCubic: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
    inQuart: function (t) { return t * t * t * t; },
    outQuart: function (t) { return 1 - (--t) * t * t * t; },
    inOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
    inQuint: function (t) { return t * t * t * t * t; },
    outQuint: function (t) { return 1 + (--t) * t * t * t * t; },
    inOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; }
};
var CbjScrollbarDirective = (function () {
    /**
     *
     * @param {?} el
     * @param {?} renderer
     * @param {?} scroll
     * @param {?} ws
     * @param {?} doc
     * @param {?} router
     */
    function CbjScrollbarDirective(el, renderer, scroll, ws, doc, router$$1) {
        var _this = this;
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
        this.setBarHeight = function () {
            var natEl = _this.el.nativeElement;
            _this.scrollHeight = Math.round(natEl.scrollHeight);
            var barHeight = (natEl.offsetHeight / natEl.scrollHeight) * natEl.offsetHeight;
            _this.renderer.setStyle(_this.bar, 'height', barHeight + "px");
            if (!_this.barNeeded(natEl.offsetHeight, barHeight) ||
                !_this.config.alwaysVisible ||
                _this.hidden) {
                _this.showHideBarGrid();
            }
            if (_this.config.isRoot) {
                _this.ws.height = natEl.clientHeight;
                _this.scroll.scrollHeight = _this.scrollHeight;
            }
        };
        /**
         * Toggle a class on one of the 3 created elements
         *
         * @param nxt { {el: string, classes: string, remove: boolean} }
         */
        this.toggleClasses = function (nxt) {
            if (nxt.remove) {
                _this.renderer.removeClass(_this[nxt.el], nxt.classes);
            }
            else {
                _this.renderer.addClass(_this[nxt.el], nxt.classes);
            }
        };
        this.showHideBarGrid = function () {
            var /** @type {?} */ natEl = _this.el.nativeElement;
            var /** @type {?} */ barHeight = (natEl.offsetHeight / natEl.scrollHeight) * natEl.offsetHeight;
            _this.notNeeded = !_this.barNeeded(natEl.offsetHeight, barHeight);
            if (!_this.hidden) {
                if (_this.notNeeded || !_this.config.alwaysVisible) {
                    _this.renderer.setStyle(_this.grid, 'opacity', 0);
                    _this.renderer.setStyle(_this.bar, 'opacity', 0);
                    _this.hidden = true;
                }
            }
            else {
                if (!_this.notNeeded) {
                    _this.renderer.setStyle(_this.grid, 'opacity', 1);
                    _this.renderer.setStyle(_this.bar, 'opacity', 1);
                    _this.hidden = false;
                    if (!_this.config.alwaysVisible) {
                        clearTimeout(_this.timeout);
                        _this.timeout = setTimeout(_this.showHideBarGrid, _this.config.visibleTimeout);
                    }
                }
            }
        };
        /**
         * Resets the timeout for hiding the scrollbar
         */
        this.resetTime = function () {
            clearTimeout(_this.timeout);
            if (_this.hidden && !_this.notNeeded) {
                _this.renderer.setStyle(_this.grid, 'opacity', 1);
                _this.renderer.setStyle(_this.bar, 'opacity', 1);
                _this.hidden = false;
            }
            _this.timeout = setTimeout(_this.showHideBarGrid, _this.config.visibleTimeout);
        };
        /**
         * Called on mouse drag while mouse down or called on touch drag while touch down
         *
         */
        this.dragStart = function (top) {
            if (!_this.config.isRoot) {
                _this.scroll.childScrolling = true;
            }
            if (!_this.config.isRoot || (_this.config.isRoot && _this.scroll.childScrolling === false)) {
                _this.renderer.setStyle(_this.bar, 'top', top + "px");
                _this.scrollContent();
            }
        };
        this.scrollContent = function () {
            var /** @type {?} */ natEl = _this.el.nativeElement;
            var /** @type {?} */ maxTop = natEl.offsetHeight - _this.bar.offsetHeight;
            var /** @type {?} */ percentScroll;
            var /** @type {?} */ delta = parseInt(getComputedStyle(_this.bar).top, 10);
            delta = Math.min(Math.max(delta, 0), maxTop);
            delta = Math.floor(delta);
            _this.renderer.setStyle(_this.bar, 'top', delta + 'px');
            percentScroll = parseInt(getComputedStyle(_this.bar).top, 10) / (natEl.offsetHeight - _this.bar.offsetHeight);
            delta = percentScroll * (natEl.scrollHeight - natEl.offsetHeight);
            natEl.scrollTop = delta;
            if (_this.config.isRoot) {
                _this.scroll.scrollPos = delta;
                _this.scroll.scrollSubj.next(delta);
            }
        };
        /**
         * Called on drag-end event
         */
        this.dragEnd = function () {
            var natEl = _this.el.nativeElement;
            var paddingTop = parseInt(natEl.style.paddingTop, 10);
            var paddingBottom = parseInt(natEl.style.paddingBottom, 10);
            if (paddingTop > 0 || paddingBottom > 0) {
                _this.scrollTo(0, 300, 'inOutCubic');
            }
            if (!_this.config.isRoot) {
                _this.scroll.childScrolling = false;
            }
        };
        this.scrollWheel = function (event) {
            if (!_this.config.isRoot) {
                _this.scroll.childScrolling = true;
            }
            var /** @type {?} */ natEl = _this.el.nativeElement;
            var /** @type {?} */ start = Date.now();
            var /** @type {?} */ maxTop = natEl.offsetHeight - _this.bar.offsetHeight;
            var /** @type {?} */ percentScroll;
            var /** @type {?} */ delta;
            var /** @type {?} */ scroll = function () {
                var /** @type {?} */ currentTime = Date.now();
                var /** @type {?} */ time = Math.min(1, ((currentTime - start) / 200));
                var /** @type {?} */ easedTime = easing.inOutQuad(time);
                delta = parseInt(getComputedStyle(_this.bar).top, 10) + event.y * easedTime;
                delta = Math.min(Math.max(delta, 0), maxTop);
                delta = (event.y > 0) ? Math.ceil(delta) : Math.floor(delta);
                _this.renderer.setStyle(_this.bar, 'top', delta + 'px');
                percentScroll = parseInt(getComputedStyle(_this.bar).top, 10) / (natEl.offsetHeight - _this.bar.offsetHeight);
                delta = percentScroll * (natEl.scrollHeight - natEl.offsetHeight);
                natEl.scrollTop = delta;
                if (_this.config.isRoot) {
                    _this.scroll.scrollPos = delta;
                    _this.scroll.scrollSubj.next(delta);
                }
                if (time < 1) {
                    requestAnimationFrame(scroll);
                }
                if (!_this.config.isRoot) {
                    _this.scroll.childScrolling = false;
                }
            };
            if (!_this.config.isRoot || (_this.config.isRoot && _this.scroll.childScrolling === false)) {
                requestAnimationFrame(scroll);
            }
        };
    }
    /**
     * @return {?}
     */
    CbjScrollbarDirective.prototype.ngOnInit = function () {
        // Start Working
        this.createScrollbar();
    };
    /**
     * @return {?}
     */
    CbjScrollbarDirective.prototype.ngAfterViewInit = function () {
        // Wait 250ms or else scrollbar breaks on page load in FF, then calculate and set the bar height
        setTimeout(this.setBarHeight, 250);
    };
    /**
     * @return {?}
     */
    CbjScrollbarDirective.prototype.ngAfterViewChecked = function () {
        // Check if scrollHeight has changed and recalculate bar height if so
        var /** @type {?} */ dif = this.scrollHeight !== Math.round(this.el.nativeElement.scrollHeight);
        if (dif) {
            this.setBarHeight();
        }
    };
    /**
     * @return {?}
     */
    CbjScrollbarDirective.prototype.ngOnDestroy = function () {
        // do some cleanup and unsubscribe from our Observables
        this.unsubscribe.next();
        this.unsubscribe.complete();
    };
    /**
     * @return {?}
     */
    CbjScrollbarDirective.prototype.createScrollbar = function () {
        this.setParentsStyles();
        this.setElementStyle();
        this.renderWrapper();
        this.renderGrid();
        this.renderBar();
        this.subscribe();
    };
    /**
     * Here we set the hosts parent to position relative
     * Additionally, to prevent a scrollbar from appearing in FF, we set the body to overflow hidden
     * @return {?}
     */
    CbjScrollbarDirective.prototype.setParentsStyles = function () {
        var /** @type {?} */ natEl = this.el.nativeElement;
        var /** @type {?} */ parent = this.renderer.parentNode(natEl);
        this.renderer.setStyle(parent, 'position', 'relative');
        var /** @type {?} */ body = this.doc.getElementsByTagName('BODY')[0];
        this.renderer.setStyle(body, 'overflow', 'hidden');
    };
    /**
     * Sets styles on host element
     *
     * @return {?}
     */
    CbjScrollbarDirective.prototype.setElementStyle = function () {
        var /** @type {?} */ natEl = this.el.nativeElement;
        this.renderer.setStyle(natEl, 'overflow', 'hidden');
    };
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
    CbjScrollbarDirective.prototype.renderWrapper = function () {
        var _this = this;
        // Get ref to containing div and create element
        var /** @type {?} */ natEl = this.el.nativeElement;
        this.wrapper = this.renderer.createElement('div');
        // Add Classes
        for (var _i = 0, _a = this.config.wClass; _i < _a.length; _i++) {
            var cls = _a[_i];
            this.renderer.addClass(this.wrapper, cls);
        }
        // Set Dynamic Styles. Wait 250ms since FF was too fast & height was still undefined
        setTimeout(function () {
            _this.renderer.setStyle(_this.wrapper, 'margin', getComputedStyle(natEl).margin);
            _this.renderer.setStyle(_this.wrapper, 'height', getComputedStyle(natEl).height);
        }, 250);
        // Set Other Styles
        this.renderer.setStyle(this.wrapper, 'width', '100%'); // Fixes issue in FF
        for (var /** @type {?} */ prop in this.config.wStyles) {
            if (this.config.wStyles.hasOwnProperty(prop)) {
                this.renderer.setStyle(this.wrapper, prop, this.config.wStyles[prop]);
            }
        }
        // Insert the wrapper before the host el and then move the host and its contents inside the wrapper
        this.renderer.insertBefore(this.renderer.parentNode(natEl), this.wrapper, natEl);
        this.renderer.appendChild(this.wrapper, natEl);
    };
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
    CbjScrollbarDirective.prototype.renderGrid = function () {
        // Create element
        this.grid = this.renderer.createElement('div');
        // Add Classes
        for (var _i = 0, _a = this.config.gClass; _i < _a.length; _i++) {
            var cls = _a[_i];
            this.renderer.addClass(this.grid, cls);
        }
        // Set Styles
        this.renderer.setStyle(this.grid, this.config.position, this.config.gridOffset);
        for (var /** @type {?} */ prop in this.config.gStyles) {
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
    };
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
    CbjScrollbarDirective.prototype.renderBar = function () {
        // Create element
        this.bar = this.renderer.createElement('div');
        // Add Classes
        for (var _i = 0, _a = this.config.bClass; _i < _a.length; _i++) {
            var cls = _a[_i];
            this.renderer.addClass(this.bar, cls);
        }
        // Center the bar in the grid. Using translate3d to utilize gpu
        var /** @type {?} */ translate = this.config.position === 'right' ? 'translate3d(50%, 0, 0)' : 'translate3d(-50%, 0, 0)';
        this.renderer.setStyle(this.bar, 'transform', translate);
        // Set Styles
        this.renderer.setStyle(this.bar, this.config.position, this.config.barOffset);
        for (var /** @type {?} */ prop in this.config.bStyles) {
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
    };
    /**
     * Subscribe to all the Observables
     * @return {?}
     */
    CbjScrollbarDirective.prototype.subscribe = function () {
        var _this = this;
        var /** @type {?} */ natEl = this.el.nativeElement;
        var /** @type {?} */ drag = this.scroll.initDrag(natEl, this.bar);
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
                .filter(function (event) { return event instanceof NavigationStart; })
                .subscribe(function (e) {
                _this.scrollTo(0, 100, 'linear');
            });
        }
        if (this.config.toggleClasses) {
            Observable$1.from(this.config.toggleClasses)
                .takeUntil(this.unsubscribe)
                .subscribe(this.toggleClasses);
        }
    };
    /**
     * Checks difference between bar height and content height. returns true if bar is needed
     *
     *
     * @param {?} elHeight
     * @param {?} barHeight
     * @return {?}
     */
    CbjScrollbarDirective.prototype.barNeeded = function (elHeight, barHeight) {
        return Math.round(elHeight) - Math.round(barHeight) > 2;
    };
    /**
     * @param {?} y
     * @param {?} duration
     * @param {?} easingFunc
     * @return {?}
     */
    CbjScrollbarDirective.prototype.scrollTo = function (y, duration, easingFunc) {
        var _this = this;
        var /** @type {?} */ natEl = this.el.nativeElement;
        var /** @type {?} */ start = Date.now();
        var /** @type {?} */ from$$1 = natEl.scrollTop;
        var /** @type {?} */ maxElScrollTop = natEl.scrollHeight - natEl.clientHeight;
        var /** @type {?} */ barHeight = Math.max((natEl.offsetHeight / natEl.scrollHeight) * natEl.offsetHeight, 30);
        var /** @type {?} */ paddingTop = parseInt(natEl.style.paddingTop, 10) || 0;
        var /** @type {?} */ paddingBottom = parseInt(natEl.style.paddingBottom, 10) || 0;
        var /** @type {?} */ scroll = function () {
            var /** @type {?} */ currentTime = Date.now();
            var /** @type {?} */ time = Math.min(1, ((currentTime - start) / duration));
            var /** @type {?} */ easedTime = easing[easingFunc](time);
            if (paddingTop > 0 || paddingBottom > 0) {
                var /** @type {?} */ fromY = null;
                if (paddingTop > 0) {
                    fromY = -paddingTop;
                    fromY = -((easedTime * (y - fromY)) + fromY);
                    _this.renderer.setStyle(natEl, 'paddingTop', fromY + "px");
                }
                if (paddingBottom > 0) {
                    fromY = paddingBottom;
                    fromY = ((easedTime * (y - fromY)) + fromY);
                    _this.renderer.setStyle(natEl, 'paddingBottom', fromY + "px");
                }
            }
            else {
                natEl.scrollTop = (easedTime * (y - from$$1)) + from$$1;
            }
            var /** @type {?} */ percentScroll = natEl.scrollTop / maxElScrollTop;
            if (paddingBottom === 0) {
                var /** @type {?} */ delta = Math.round(Math.round(natEl.clientHeight * percentScroll) - barHeight);
                if (delta > 0) {
                    _this.renderer.setStyle(_this.bar, 'top', delta + "px");
                }
                else {
                    _this.renderer.setStyle(_this.bar, 'top', "0");
                }
            }
            if (time < 1) {
                requestAnimationFrame(scroll);
            }
        };
        requestAnimationFrame(scroll);
    };
    return CbjScrollbarDirective;
}());
CbjScrollbarDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cbjScrollbar]'
            },] },
];
/**
 * @nocollapse
 */
CbjScrollbarDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: ScrollbarService, },
    { type: WindowService, },
    { type: Document, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: Router, decorators: [{ type: Optional },] },
]; };
CbjScrollbarDirective.propDecorators = {
    'config': [{ type: Input, args: ['cbjScrollbar',] },],
};
var CbjScrollbarModule = (function () {
    function CbjScrollbarModule() {
    }
    /**
     * @return {?}
     */
    CbjScrollbarModule.forRoot = function () {
        return {
            ngModule: CbjScrollbarModule,
            providers: [
                { provide: WINDOW, useFactory: _window },
                WindowService,
                ScrollbarService
            ]
        };
    };
    return CbjScrollbarModule;
}());
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
CbjScrollbarModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { DEFAULT_SCROLLBAR, ScrollbarConfig, WINDOW, _window, WindowService, ScrollbarService, CbjScrollbarDirective, CbjScrollbarModule, CbjScrollbarDirective as ɵa, ScrollbarService as ɵb, WindowService as ɵc, WINDOW as ɵd, _window as ɵe };
//# sourceMappingURL=scrollbar.es5.js.map
