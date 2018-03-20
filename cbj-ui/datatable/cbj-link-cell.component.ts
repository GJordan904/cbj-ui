import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cbj-link-cell',
  template: `<ng-container *ngIf="link; else elseBlock">
      <a [routerLink]="link">{{ text }}</a>
  </ng-container>
  <ng-template #elseBlock><span [innerHTML]="text"></span></ng-template>`
})
export class CbjLinkCellComponent implements OnInit {
  @Input()row: any;
  @Input()keys: string[];
  link: string;
  text: string;

  ngOnInit() {
    this.link = this.row[this.keys[0]];
    this.text = this.row[this.keys[1]];
  }
}
