import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
export declare class WindowService {
    private w;
    /**
     * Observable of the window resize event
     */
    resizeObs: Observable<any>;
    private _height;
    constructor(w: Window);
    /**
     * Get the browsers window object
     *
     * @returns {Window}
     */
    readonly window: Window;
    /**
     * Get the width of the window
     *
     * @returns {number}
     */
    readonly width: number;
    /**
     * Return whether device is on a screen < 992px wide
     *
     * @returns {boolean}
     */
    readonly isMobile: boolean;
    /**
     * Get the height of the window
     *
     * @returns {number}
     */
    /**
     * Set the height of the window
     *
     */
    height: number;
}
