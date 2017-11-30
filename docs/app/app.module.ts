import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CbjUiModule } from '@codebyjordan/ui';
import { HomeComponent } from './views/home/home.component';
import { AnimInViewDemoComponent } from './views/modules/scroll/anim-in-view-demo/anim-in-view-demo.component';
import { LayoutDemoComponent } from './views/modules/layout/layout-demo/layout-demo.component';
import { CardTabsDemoComponent } from './views/modules/navs/card-tabs-demo/card-tabs-demo.component';
import { ElInViewDemoComponent } from './views/modules/scroll/el-in-view-demo/el-in-view-demo.component';
import { AppRoutingModule } from './app-routing.module';
import { BytesTransformDemoComponent } from './views/modules/pipes/bytes-transform-demo/bytes-transform-demo.component';
import { ScrollServiceDemoComponent } from './views/services/scroll-service-demo/scroll-service-demo.component';
import { RippleDemoComponent } from './views/modules/ripple/ripple-demo/ripple-demo.component';
import { HighlightDirective } from './directives/highlight.directive';
import {HttpClientModule} from '@angular/common/http';
import { ModelsPreviewComponent } from './views/models/models-preview.component';
import { DatatableDemoComponent } from './views/modules/datatable/datatable-demo/datatable-demo.component';
import { MenuDemoComponent } from './views/modules/menu/menu-demo/menu-demo.component';
import { GettingStartedComponent } from './views/getting-started/getting-started.component';


@NgModule({
  declarations: [
    HighlightDirective,
    AppComponent,
    HomeComponent,
    AnimInViewDemoComponent,
    LayoutDemoComponent,
    CardTabsDemoComponent,
    ElInViewDemoComponent,
    BytesTransformDemoComponent,
    ScrollServiceDemoComponent,
    RippleDemoComponent,
    ModelsPreviewComponent,
    DatatableDemoComponent,
    MenuDemoComponent,
    GettingStartedComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CbjUiModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
