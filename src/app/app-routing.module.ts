import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AnimInViewDemoComponent} from './components/anim-in-view-demo/anim-in-view-demo.component';
import {AppDrawerDemoComponent} from './components/app-drawer-demo/app-drawer-demo.component';
import {CardTabsDemoComponent} from './components/card-tabs-demo/card-tabs-demo.component';
import {ElInViewDemoComponent} from './directives/el-in-view-demo/el-in-view-demo.component';
import {ScrollServiceDemoComponent} from './services/scroll-service-demo/scroll-service-demo.component';
import {BytesTransformDemoComponent} from './pipes/bytes-transform-demo/bytes-transform-demo.component';
import {ModelsPreviewComponent} from './models/models-preview/models-preview.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'components', children: [
    { path: 'anim-in-view', component: AnimInViewDemoComponent },
    { path: 'app-drawer', component: AppDrawerDemoComponent },
    { path: 'card-tabs', component: CardTabsDemoComponent }
  ]
  },
  { path: 'directives', children: [
    { path: 'el-in-view', component: ElInViewDemoComponent },
  ]
  },
  { path: 'services', children: [
    { path: 'scroll-service', component: ScrollServiceDemoComponent },
  ]
  },
  { path: 'pipes', children: [
    { path: 'bytes-transform', component: BytesTransformDemoComponent },
  ]
  },
  {
    path: 'models/{model}', component: ModelsPreviewComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
