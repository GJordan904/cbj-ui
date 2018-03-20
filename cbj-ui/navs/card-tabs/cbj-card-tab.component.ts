import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cbj-card-tab',
  template: '<div [hidden]="!active"><ng-content></ng-content></div>'

})
export class CbjCardTabComponent implements OnInit {
  @Input('title') title: string;
  @Input() active = false;
  @Input('icon') icon: boolean | string = false;

  constructor() { }

  ngOnInit() {
  }

}
