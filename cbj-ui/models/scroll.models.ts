export interface ScrollBarOptions {
  isRoot?: boolean;
  position?: string;
  barBackground?: string;
  barOpacity?: number;
  barWidth?: string;
  barBorderRadius?: string;
  barMargin?: string;
  wrapperClass?: string;
  gridBackground?: string;
  gridOpacity?: number;
  gridWidth?: string;
  gridBorderRadius?: string;
  gridMargin?: string;
  alwaysVisible?: boolean;
  visibleTimeout?: number;
}

export interface ParallaxConfig {
  startPosition?: number;
  ratio?: number;
  maxValue?: number;
  minValue?: number;
  cssUnit?: string;
}