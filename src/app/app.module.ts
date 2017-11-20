import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { UiModule } from '@codebyjordan/ui';
import { HomeComponent } from './home/home.component';
import { AnimInViewDemoComponent } from './components/anim-in-view-demo/anim-in-view-demo.component';
import { AppDrawerDemoComponent } from './components/app-drawer-demo/app-drawer-demo.component';
import { CardTabsDemoComponent } from './components/card-tabs-demo/card-tabs-demo.component';
import { ElInViewDemoComponent } from './directives/el-in-view-demo/el-in-view-demo.component';
import { AppRoutingModule } from './app-routing.module';
import { BytesTransformDemoComponent } from './pipes/bytes-transform-demo/bytes-transform-demo.component';
import { ScrollServiceDemoComponent } from './services/scroll-service-demo/scroll-service-demo.component';
import { RippleDemoComponent } from './directives/ripple-demo/ripple-demo.component';
import { HighlightDirective } from './directives/highlight.directive';
import {HttpClientModule} from '@angular/common/http';
import { ModelsPreviewComponent } from './models/models-preview/models-preview.component';


@NgModule({
  declarations: [
    HighlightDirective,
    AppComponent,
    HomeComponent,
    AnimInViewDemoComponent,
    AppDrawerDemoComponent,
    CardTabsDemoComponent,
    ElInViewDemoComponent,
    BytesTransformDemoComponent,
    ScrollServiceDemoComponent,
    RippleDemoComponent,
    ModelsPreviewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UiModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
