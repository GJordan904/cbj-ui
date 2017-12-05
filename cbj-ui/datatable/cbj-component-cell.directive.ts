import {AfterContentInit, ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {ComponentCellOptions} from '../models';

@Directive({
  selector: '[cbjCompCell]'
})
export class CbjCompCellDirective implements OnInit {
  @Input('cbjCompCell') cbjCompCell: ComponentCellOptions;

  constructor(private viewContainerRef: ViewContainerRef,
              private cfr: ComponentFactoryResolver) {
  }

  ngOnInit() {
    const compFactory = this.cfr.resolveComponentFactory(this.cbjCompCell.component);
    const compRef = this.viewContainerRef.createComponent(compFactory);
    (<any>compRef.instance).row = this.cbjCompCell.row;
    (<any>compRef.instance).keys = this.cbjCompCell.keys;
  }
}
