import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { StylingComponent } from './styling/styling.component';
import { GuidesComponent } from './guides.component';

const routes: Routes = [
  { path: '', component: GuidesComponent },
  { path: 'getting-started', component: GettingStartedComponent },
  { path: 'styling', component: StylingComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class GuidesRoutingModule { }
