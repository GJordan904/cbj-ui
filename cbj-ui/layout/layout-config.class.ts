import { FooterTypes, LayoutOptions, SidebarLink } from './cbj-layout.models';
import { Subject } from 'rxjs/Subject';
import {ScrollbarConfig, ScrollbarOptions} from '../scroll/index';
import { RippleConfig } from '../ripple/index';

/**
 * @class LayoutConfig
 *
 */
export class LayoutConfig {
  /**
   * The scrollbars options.
   * A deep merge of the default options and the user provided options
   */
  private options: LayoutOptions;

  /**
   * Configuration object for the side scrollbar
   */
  private _sideScrollConfig: ScrollbarConfig;

  /**
   * Configuration object for the main scrollbar
   */
  private _mainScrollConfig: ScrollbarConfig;

  /**
   * @constructor
   * @param {LayoutOptions} opt
   */
  constructor(opt: LayoutOptions) {
    // Create a scrollbar Config with no options to use for merging the scrollbar options
    this.mainScrollConfig = new ScrollbarConfig({});
    // Merge our layout options
    this.mergeOptions(opt, true);
    // Merge and set the options on the scrollbar config created earlier
    this.mainScrollConfig.mergeOptions(this.mainScrollbarOptions, true);
    // Create side scrollbar config if needed
    if (this.useSidebar) {
      this.sideScrollConfig = new ScrollbarConfig(this.sideScrollbarOptions);
    }
  }

  /**
   * Merge the defaults and options by performing a deep merge
   *
   * @param {LayoutOptions} opt
   * @param {boolean} setOpt
   *
   * @return {LayoutOptions}
   */
  mergeOptions(opt: LayoutOptions, setOpt: boolean = false): LayoutOptions {
    let navbarClasses = DEFAULT_CONFIG.navbarClasses;
    let linkClasses = {};
    let sideScrollbarOptions = DEFAULT_CONFIG.sideScrollbarOptions;
    let mainScrollbarOptions = DEFAULT_CONFIG.mainScrollbarOptions;

    // Concatenate the navbarClasses
    if (opt.navbarClasses) {
      navbarClasses = `${navbarClasses} ${opt.navbarClasses}`;
    }

    // Concatenate each key in the linkClasses
    if (opt.linkClasses) {
      const keys = Object.keys(opt.linkClasses);
      for (const key of keys) {
        linkClasses[key] = `${DEFAULT_CONFIG.linkClasses[key]} ${opt.linkClasses[key]}`;
      }
      linkClasses = { ...DEFAULT_CONFIG.linkClasses, ...linkClasses};
    }else {
      linkClasses = {...DEFAULT_CONFIG.linkClasses};
    }

    // Merge the Side Scrollbar Options. Add our side scrollbar Subject last so we have the right reference
    if (opt.sideScrollbarOptions) {
      sideScrollbarOptions = this.mainScrollConfig.mergeOptions(opt.sideScrollbarOptions, false, sideScrollbarOptions);
    }
    sideScrollbarOptions = {
      ...sideScrollbarOptions,
      ...{toggleClasses: new Subject<{ el: string, classes: string, remove: boolean }>() }
    };

    // Merge main scrollbar options
    if (opt.mainScrollbarOptions) {
      mainScrollbarOptions = this.mainScrollConfig.mergeOptions(opt.mainScrollbarOptions, false, mainScrollbarOptions);
    }

    // Merge it all together, order matters of course
    const out = {
      ...DEFAULT_CONFIG,
      ...opt,
      ...{navbarClasses},
      ...{linkClasses: linkClasses},
      ...{sideScrollbarOptions},
      ...{mainScrollbarOptions}
      };
    if (setOpt) {
      this.options = out;
    }

    return out;
  }

  /**
   *
   * @returns {boolean | undefined}
   */
  get useSidebar() {
    return this.options.useSidebar;
  }

  /**
   *
   * @returns {RippleConfig | undefined}
   */
  get rippleConf() {
    return this.options.rippleConf;
  }

  /**
   *
   * @returns {boolean | undefined}
   */
  get closeOnClick() {
    return this.options.closeOnClick;
  }

  /**
   *
   * @returns {FooterTypes}
   */
  get footerType() {
    return this.options.footerType;
  }

  /**
   *
   * @returns {string | undefined}
   */
  get footerClasses() {
    return this.options.footerClasses;
  }

  /**
   *
   * @returns {SidebarLink[] | undefined}
   */
  get sidebarLinks() {
    return this.options.sidebarLinks;
  }

  /**
   *
   * @returns {Subject | undefined}
   */
  get toggleClasses() {
    return this.options.sideScrollbarOptions.toggleClasses;
  }

  /**
   *
   * @returns {string | undefined}
   */
  get headingClass() {
    return this.options.linkClasses.heading;
  }

  /**
   *
   * @returns {string | undefined}
   */
  get linkClass() {
    return this.options.linkClasses.link;
  }

  /**
   *
   * @returns {string | undefined}
   */
  get dropdownClass() {
    return this.options.linkClasses.dropdown;
  }

  /**
   *
   * @returns {string | undefined}
   */
  get activeClass() {
    return this.options.linkClasses.active;
  }

  /**
   *
   * @returns {string | undefined}
   */
  get navbarClasses() {
    return this.options.navbarClasses;
  }

  /**
   *
   * @returns {ScrollbarOptions | undefined}
   */
  get sideScrollbarOptions() {
    return this.options.sideScrollbarOptions;
  }

  /**
   *
   * @returns {ScrollbarOptions | undefined}
   */
  get mainScrollbarOptions() {
    return this.options.mainScrollbarOptions;
  }

  /**
   *
   * @returns {ScrollbarConfig}
   */
  get sideScrollConfig(): ScrollbarConfig {
    return this._sideScrollConfig;
  }

  /**
   *
   * @param {ScrollbarConfig} value
   */
  set sideScrollConfig(value: ScrollbarConfig) {
    this._sideScrollConfig = value;
  }

  /**
   *
   * @returns {ScrollbarConfig}
   */
  get mainScrollConfig(): ScrollbarConfig {
    return this._mainScrollConfig;
  }

  /**
   *
   * @param {ScrollbarConfig} value
   */
  set mainScrollConfig(value: ScrollbarConfig) {
    this._mainScrollConfig = value;
  }
}

const DEFAULT_CONFIG: LayoutOptions = {
  footerType: FooterTypes.BOTTOM,
  useSidebar: false,
  rippleConf: {opacity: .2, color: '#000', expandTime: .18},
  closeOnClick: false,
  navbarClasses: 'navbar-dark bg-primary',
  linkClasses: {
    active: 'active',
    heading: 'cbj-heading-link',
    dropdown: 'cbj-dropdown-link',
    link: 'cbj-link'
  },
  sideScrollbarOptions: {
    wrapperWidth: false,
    classes: {
      wrapper: ['sidebar-scroll-wrapper']
    }
  }
};
