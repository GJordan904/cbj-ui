import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RippleComponent } from './ripple/ripple.component';
import { EasingsComponent } from './easings/easings.component';
import { TransitionsComponent } from './transitions/transitions.component';
import { AnimationsComponent } from './animations.component';

const routes: Routes = [
  { path: '', component: AnimationsComponent },
  { path: 'ripple', component: RippleComponent },
  { path: 'easings', component: EasingsComponent },
  { path: 'transitions', component: TransitionsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AnimationsRoutingModule { }
