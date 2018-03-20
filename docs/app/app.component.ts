import {Component, OnDestroy, OnInit} from '@angular/core';
import { LayoutConfig } from '@codebyjordan/ui';
import { LAYOUT_CONFIG } from './config/layout.config';

@Component({
  selector: 'cbj-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit, OnDestroy {
  layoutConfig: LayoutConfig;

  constructor() { }

  ngOnInit() {
    this.layoutConfig = new LayoutConfig(LAYOUT_CONFIG);
  }

  ngOnDestroy() {
  }
}
