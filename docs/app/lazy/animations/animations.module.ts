import { NgModule } from '@angular/core';
import { AnimationsRoutingModule } from './animations-routing.module';
import { EasingsComponent } from './easings/easings.component';
import { TransitionsComponent } from './transitions/transitions.component';
import { RippleComponent } from './ripple/ripple.component';
import { AnimationsComponent } from './animations.component';
import { CbjCommonModule } from '../../common/cbj-common.module';

@NgModule({
  imports: [
    CbjCommonModule,
    AnimationsRoutingModule
  ],
  declarations: [
    EasingsComponent,
    TransitionsComponent,
    RippleComponent,
    AnimationsComponent
  ],
  exports: [
    AnimationsRoutingModule,
    EasingsComponent,
    TransitionsComponent,
    RippleComponent,
    AnimationsComponent
  ]
})
export class AnimationsModule { }
