import { Subject } from 'rxjs/Subject';
import { ScrollbarOptions } from './scrollbar-options';
/**
 * @class ScrollbarConfig
 *
 */
export declare class ScrollbarConfig {
    /**
     * The scrollbars options.
     * A deep merge of the default options and the user provided options
     *
     * @type {ScrollbarOptions}
     */
    private options;
    /**
     * @constructor
     * @param {ScrollbarOptions} opt
     */
    constructor(opt: ScrollbarOptions);
    /**
     * Merge the defaults and options by performing a deep merge
     *
     * @param {ScrollbarOptions} opt the scrollbar options to merge with the defaults
     * @param {boolean} setOpt flag indicating whether the created options should be assigned to the options member variable
     * @param {ScrollbarOptions} mergeWith optional default scrollbar options to be used instead of the package defaults
     *
     * @return {ScrollbarOptions}
     */
    mergeOptions(opt: ScrollbarOptions, setOpt?: boolean, mergeWith?: ScrollbarOptions): {
        classes: {};
        styles: {};
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
    };
    /**
     *
     * @returns {boolean | undefined}
     */
    readonly isRoot: boolean;
    /**
     *
     * @returns {string | undefined}
     */
    readonly position: string;
    /**
     *
     * @returns {boolean | undefined}
     */
    readonly alwaysVisible: boolean;
    /**
     *
     * @returns {number | undefined}
     */
    readonly visibleTimeout: number;
    /**
     *
     * @returns {string | number | undefined}
     */
    readonly gridOffset: string | number;
    /**
     *
     * @returns {string | number | undefined}
     */
    readonly barOffset: string | number;
    /**
     *
     * @returns {Subject | undefined}
     */
    readonly toggleClasses: Subject<{
        el: string;
        classes: string;
        remove: boolean;
    }>;
    /**
     *
     * @returns {Array | undefined}
     */
    readonly wStyles: {
        [prop: string]: string | number;
    };
    /**
     *
     * @returns {Array | undefined}
     */
    readonly gStyles: {
        [prop: string]: string | number;
    };
    /**
     *
     * @returns {Array | undefined}
     */
    readonly bStyles: {
        [prop: string]: string | number;
    };
    /**
     *
     * @returns {string | undefined}
     */
    readonly wClass: string[];
    /**
     *
     * @returns {string | undefined}
     */
    readonly gClass: string[];
    /**
     *
     * @returns {string | undefined}
     */
    readonly bClass: string[];
}
