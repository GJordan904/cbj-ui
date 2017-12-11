import {Subject} from 'rxjs/Subject';

export interface ScrollBarOptions {
  isRoot?: boolean;
  position?: string;
  barOffset?: string;
  barBackground?: string;
  barWidth?: string;
  barBorderRadius?: string;
  barMargin?: string;
  wrapperWidth?: string;
  wrapperStyles?: Array<{prop: string, val: string}>;
  wrapperClasses?: string;
  gridBackground?: string;
  gridWidth?: string;
  gridOffset?: string;
  gridBorderRadius?: string;
  gridMargin?: string;
  alwaysVisible?: boolean;
  visibleTimeout?: number;
  toggleClasses?: Subject<{el: string, classes: string, remove: boolean}>;
}

export interface ParallaxConfig {
  startPosition?: number;
  ratio?: number;
  maxValue?: number;
  minValue?: number;
  cssUnit?: string;
}