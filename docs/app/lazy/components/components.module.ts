import { NgModule } from '@angular/core';
import { ComponentsComponent } from './components.component';
import { TableComponent } from './datatable/table/table.component';
import { LinkCellComponent } from './datatable/link-cell/link-cell.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { MenuComponent } from './layout/menu/menu.component';
import { CardTabsComponent } from './layout/card-tabs/card-tabs.component';
import { BytesTransformComponent } from './datatable/bytes-transform/bytes-transform.component';
import { AnimateInViewComponent } from './scrolling/animate-in-view/animate-in-view.component';
import { InViewComponent } from './scrolling/in-view/in-view.component';
import { ParallaxComponent } from './scrolling/parallax/parallax.component';
import { ScrollbarComponent } from './scrolling/scrollbar/scrollbar.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { CbjCommonModule } from '../../common/cbj-common.module';
import { ButtonsComponent } from './buttons/buttons.component';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  imports: [
    CbjCommonModule,
    ComponentsRoutingModule,
  ],
  declarations: [
    ComponentsComponent,
    TableComponent,
    LinkCellComponent,
    LayoutComponent,
    MenuComponent,
    CardTabsComponent,
    BytesTransformComponent,
    AnimateInViewComponent,
    InViewComponent,
    ParallaxComponent,
    ScrollbarComponent,
    ButtonsComponent,
    GalleryComponent,
  ]
})
export class ComponentsModule { }
