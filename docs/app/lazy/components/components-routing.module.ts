import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardTabsComponent } from './layout/card-tabs/card-tabs.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { MenuComponent } from './layout/menu/menu.component';
import { BytesTransformComponent } from './datatable/bytes-transform/bytes-transform.component';
import { LinkCellComponent } from './datatable/link-cell/link-cell.component';
import { TableComponent } from './datatable/table/table.component';
import { AnimateInViewComponent } from './scrolling/animate-in-view/animate-in-view.component';
import { InViewComponent } from './scrolling/in-view/in-view.component';
import { ParallaxComponent } from './scrolling/parallax/parallax.component';
import { ScrollbarComponent } from './scrolling/scrollbar/scrollbar.component';
import { ComponentsComponent } from './components.component';
import { ButtonsComponent } from './buttons/buttons.component';

const routes: Routes = [
  { path: '', component: ComponentsComponent },
  {
    path: 'buttons', component: ButtonsComponent },
  {
    path: 'datatable', children: [
      { path: 'bytes-transform', component: BytesTransformComponent },
      { path: 'link-cell', component: LinkCellComponent },
      { path: 'table', component: TableComponent },
    ]
  },
  {
    path: 'layout', children: [
      { path: 'card-tabs', component: CardTabsComponent },
      { path: 'layout', component: LayoutComponent },
      { path: 'menu', component: MenuComponent },
    ]
  },
  {
    path: 'scrolling', children: [
      {path: 'animate-in-view', component: AnimateInViewComponent},
      {path: 'in-view', component: InViewComponent},
      {path: 'parallax', component: ParallaxComponent},
      {path: 'scrollbar', component: ScrollbarComponent},
    ]
  }
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
export class ComponentsRoutingModule { }
