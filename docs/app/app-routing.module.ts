import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  { path: 'cbj-ui', component: HomeComponent },
  { path: 'animations', loadChildren: 'app/lazy/animations/animations.module#AnimationsModule' },
  { path: 'components', loadChildren: 'app/lazy/components/components.module#ComponentsModule' },
  { path: 'guides', loadChildren: 'app/lazy/guides/guides.module#GuidesModule' },
  { path: '', pathMatch: 'full', redirectTo: '/cbj-ui' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
