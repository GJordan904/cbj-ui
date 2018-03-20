import { NgModule } from '@angular/core';
import { StylingComponent } from './styling/styling.component';
import { GuidesComponent } from './guides.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { GuidesRoutingModule } from './guides-routing.module';
import { CbjCommonModule } from '../../common/cbj-common.module';

@NgModule({
  imports: [
    CbjCommonModule,
    GuidesRoutingModule,
  ],
  declarations: [
    GettingStartedComponent,
    StylingComponent,
    GuidesComponent,
  ],
  exports: [
    GuidesRoutingModule,
  ]
})
export class GuidesModule { }
