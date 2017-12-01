import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GettingStartedComponent implements OnInit {
  installCode = {language: 'bash', code: 'npm i --save @codebyjordan/ui'};
  importAllCode = {language: 'typescript', code: `// app.module.ts
import { CbjUiModule } from '@codebyjordan/ui';

@NgModule({
  ...
  imports: [
    CbjUiModule.forRoot(),
  ],
  ...
})
export class AppModule { }`
  };
  sharedCode = {language: 'typescript', code: `// shared.module.ts
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { CbjUiModule } from '@codebyjordan/ui';

@NgModule({
  ...
  exports: [
    CbjUiModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ...
  ]
  ...
})
export class SharedModule { }`};
  stylesCode = {language: 'scss', code: `// styles.scss
@import './your/custom/variables';
@import '~bootstrap/scss/bootstrap';
@import '~@codebyjordan/ui/scss/cbj-ui';
...`};

  constructor() { }

  ngOnInit() {
  }

}
