import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-el-in-view-demo',
  templateUrl: './el-in-view-demo.component.html',
  styleUrls: ['./el-in-view-demo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ElInViewDemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
