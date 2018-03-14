import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cbj-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  usageCode = {
    language: 'markup',
    code: `
<cbj-button [rippleConf]="{color: '#000', opacity: .15, expandTime: .25}">different</cbj-button> <!-- All -->

<cbj-button [raised]="true" btnClasses="btn-primary">styles</cbj-button> <!-- Of -->

<cbj-button btnClasses="btn-secondary">and</cbj-button> <!-- These -->

<cbj-button [raised]="true" btnClasses="btn-info">colors</cbj-button> <!-- Render -->

<cbj-button btnClasses="btn-warning">of</cbj-button> <!-- <buttons></buttons> -->

<cbj-button link="/cbj-ui" text="buttons" btnClasses="btn-danger"></cbj-button> <!-- But this one renders an <a></a> -->`
  };
  constructor() { }

  ngOnInit() {
  }

}
