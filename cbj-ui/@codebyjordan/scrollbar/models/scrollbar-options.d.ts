import { Subject } from 'rxjs/Subject';
/**
 * @interface {ScrollbarOptions}
 *
 * @property {boolean}          - isRoot         - flag to set when the scrollbar is used as the main windows scrollbar
 * @property {string}           - position       - The side of the window the scrollbar appears
 * @property {boolean}          - alwaysVisible  - flag to set when the scrollbar should remain visible
 * @property {number}           - visibleTimeout - the time before the scrollbar auto hides
 * @property {number}           - gridOffset     - the css value for the {position} property that is applied to the grid
 * @property {number}           - barOffset      - the css value for the {position} property that is applied to the bar
 * @property {Subject}          - toggleClasses  - for toggling classes on the 3 generated elements
 * @property {ScrollbarStyles}  - styles         - the styles to be applied to the 3 generated elements
 * @property {ScrollbarClasses} - classes        - the classes to be applied to the 3 generated elements
 */
export interface ScrollbarOptions {
    isRoot?: boolean;
    position?: string;
    alwaysVisible?: boolean;
    visibleTimeout?: number;
    gridOffset?: string | number;
    barOffset?: string | number;
    toggleClasses?: Subject<{
        el: string;
        classes: string;
        remove: boolean;
    }>;
    styles?: ScrollbarStyles;
    classes?: ScrollbarClasses;
}
/**
 * @interface {ScrollbarStyles}
 *
 * Can contain a key for any of the three elements created by the directive (wrapper, grid, bar)
 * Each with an object containing any valid css properties as keys with a valid value as a string or number
 */
export interface ScrollbarStyles {
    wrapper?: {
        [prop: string]: string | number;
    };
    grid?: {
        [prop: string]: string | number;
    };
    bar?: {
        [prop: string]: string | number;
    };
}
/**
 * @interface {ScrollbarClasses}
 *
 * Can contain a key for any of the three elements created by the directive (wrapper, grid, bar)
 * Each key can take an array of class names
 */
export interface ScrollbarClasses {
    wrapper?: string[];
    grid?: string[];
    bar?: string[];
}
/**
 * The default Scrollbar options
 *
 */
export declare const DEFAULT_SCROLLBAR: ScrollbarOptions;
