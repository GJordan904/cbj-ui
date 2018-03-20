const install = {
  language: 'bash',
  code: 'npm i --save @codebyjordan/ui'
};

const build = {
  language: 'bash',
  code: 'npm run build:lib'
};

const importAll = {
  language: 'typescript',
  code: `// app.module.ts
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
const shared = {
  language: 'typescript',
  code: `// shared.module.ts
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
export class SharedModule { }`
};

const styles = {
  language: 'scss',
  code: `// styles.scss
@import './your/custom/variables';
@import '~@codebyjordan/ui/scss/cbj-ui';
...`
};

export {install, build, importAll, styles, shared};
