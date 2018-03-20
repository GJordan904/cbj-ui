import { Component, HostBinding, OnInit } from '@angular/core';
import {install, build, importAll, styles, shared} from './demo-code';

@Component({
  selector: 'cbj-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss']
})
export class GettingStartedComponent implements OnInit {
  installCode = install;
  buildCode = build;
  importAllCode = importAll;
  stylesCode = styles;
  sharedCode = shared;

  constructor() { }

  ngOnInit() {
  }

}
