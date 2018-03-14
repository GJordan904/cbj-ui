import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { ScrollbarService, WINDOW, _window, WindowService } from './@codebyjordan/scrollbar';
import { CbjPipesModule } from './pipes';
import { CbjDatatableModule, CbjLinkCellComponent } from './datatable';
import { CbjNavsModule } from './navs';
import { CbjLayoutModule } from './layout';
import { CbjUiConfig } from './cbj-ui.models';
import { CbjRippleModule } from './ripple';
import { CbjMenuModule } from './menu';
import { CbjScrollModule } from './scroll';
import { CbjButtonModule } from './buttons';

// Create Injection Token for our Config object
export const CbjConfig = new InjectionToken<CbjUiConfig>('CbjConfig');

/**
 * Compiling with AOT requires that our forRoot method be bare bones and simply return a module with providers.
 * Any logic should be done inside an exported function.
 * To pass the config to the function for processing, we create an InjectionToken from the config and pass it as a dependency
 *
 */
export function EntryComponents(config: CbjUiConfig): Component[] {
  const entryComps: any[] = [CbjLinkCellComponent];

  if (config.tableComponents) {
    for (const comp of config.tableComponents) {
      entryComps.push(comp);
    }
  }

  return entryComps;
}

@NgModule({
  exports: [
    CbjDatatableModule,
    CbjLayoutModule,
    CbjMenuModule,
    CbjNavsModule,
    CbjPipesModule,
    CbjRippleModule,
    CbjScrollModule,
    CbjButtonModule
  ]
})
export class CbjUiModule {
  constructor () { }

  static forRoot(config: CbjUiConfig): ModuleWithProviders {
    return {
      ngModule: CbjUiModule,
      providers: [
        {provide: CbjConfig, useValue: config},
        ScrollbarService,
        { provide: WINDOW, useFactory: _window },
        WindowService,
        {provide: ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: EntryComponents, deps: [CbjConfig]}
      ]
    };
  }
}
