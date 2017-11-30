import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {AnimInViewDemoComponent} from './views/modules/scroll/anim-in-view-demo/anim-in-view-demo.component';
import {LayoutDemoComponent} from './views/modules/layout/layout-demo/layout-demo.component';
import {CardTabsDemoComponent} from './views/modules/navs/card-tabs-demo/card-tabs-demo.component';
import {ElInViewDemoComponent} from './views/modules/scroll/el-in-view-demo/el-in-view-demo.component';
import {ScrollServiceDemoComponent} from './views/services/scroll-service-demo/scroll-service-demo.component';
import {BytesTransformDemoComponent} from './views/modules/pipes/bytes-transform-demo/bytes-transform-demo.component';
import {ModelsPreviewComponent} from './views/models/models-preview.component';
import {DatatableDemoComponent} from './views/modules/datatable/datatable-demo/datatable-demo.component';
import {MenuDemoComponent} from './views/modules/menu/menu-demo/menu-demo.component';
import {RippleDemoComponent} from './views/modules/ripple/ripple-demo/ripple-demo.component';
import {GettingStartedComponent} from './views/getting-started/getting-started.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'getting-started', component: GettingStartedComponent },
  { path: 'cards', children: [
    { path: 'card-tabs', component: CardTabsDemoComponent }
  ]
  },
  { path: 'datatable', children: [
    { path: 'component', component: DatatableDemoComponent },
  ]
  },
  { path: 'layout', children: [
    { path: 'component', component: LayoutDemoComponent },
  ]
  },
  { path: 'menu', children: [
    { path: 'component', component: MenuDemoComponent },
  ]
  },
  { path: 'pipes', children: [
    { path: 'bytes-transform', component: BytesTransformDemoComponent },
  ]
  },
  { path: 'ripple', children: [
    { path: 'directive', component: RippleDemoComponent },
  ]
  },
  { path: 'scroll', children: [
    { path: 'el-in-view', component: ElInViewDemoComponent },
    { path: 'anim-in-view', component: AnimInViewDemoComponent },
  ]
  },
  { path: 'services', children: [
    { path: 'scroll-service', component: ScrollServiceDemoComponent },
  ]
  },
  { path: 'models/{model}', component: ModelsPreviewComponent },
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
