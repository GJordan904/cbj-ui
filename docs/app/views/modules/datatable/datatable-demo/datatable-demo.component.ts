import { Component, OnInit } from '@angular/core';
import {DatatableOptions} from '@codebyjordan/ui';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-datatable-demo',
  templateUrl: './datatable-demo.component.html',
  styleUrls: ['./datatable-demo.component.scss']
})
export class DatatableDemoComponent implements OnInit {
  basicComp = {
    language: 'typescript',
    code: `import {Component, OnInit} from '@angular/core';
import {DatatableOptions} from '@codebyjordan/ui';

@Component({
  selector: 'basic-table',
  templateUrl: './basic-table.component.html'
})
export class BasicTableComponent implements OnInit {
  
  ngOnInit() {
    this.dtOptions = {
      data: '/api/get-data',
      columns: [
        { name: 'Name', data: 'name' },
        { name: 'Email', data: 'email' },
        { name: 'Address', data: 'address' },
        { name: 'Phone #', data: 'phone' },
      ]
    }
  }
}`
  };

  basicTemp = {
    language: 'markup',
    code: `<cbj-datatable [options]="dtOptions"></cbj-datatable>`
  };

  multiDataComp = {
    language: 'typescript',
    code: `import {Component, OnInit} from '@angular/core';
import {DatatableOptions} from '@codebyjordan/ui';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-layout-demo',
  templateUrl: './layout-demo.component.html',
  styleUrls: ['./layout-demo.component.scss']
})
export class LayoutDemoComponent implements OnInit {
  
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.dtOptions = {
      title: 'API',
      multiData: true,
      cardClasses: 'bg-secondary',
      columns: [
        [
          {name: 'Name', data: 'name', flex: 1},
          {name: 'Type', flex: 1, data: (row) => {
              if (row.link) {
                return this.sanitizer.bypassSecurityTrustHtml(\`<a href="\${row.link}">\${row.type}</a>\`);
              }
              return \`\${row.type}\`;
            }
          },
          {name: 'Description', data: 'description', flex: 2}
        ],
        [
          { name: 'Attribute', data: 'name'},
          { name: 'Description', data: 'description', flex: 3}
        ],
        [

        ]
      ],
      data: [
        {
          name: 'Inputs', data: [
            {
              name: 'navbarClasses',
              type: 'string',
              description: 'Classes to be applied to the navbar in addition to the navbar class.',
            },
            {
              name: 'sidebarLinks',
              type: 'SidebarLinks',
              link: '/models/sidebar-links',
              description: 'The object describing the links and classes that will make up the sidebars links.',
            }
          ]
        },
        {
          name: 'Slots', data: [
          {
            name: 'navbar-brand',
            description: 'Added inside the element with the navbar-brand class.',
          },
          {
            name: 'navbar-content',
            description: 'Added inside the navbar, to the right of navbar-brand.',
          },
          {
            name: 'sidebar-header',
            description: 'Added inside the sidebar, above all other content.',
          },
          {
            name: 'sidebar-footer',
            description: 'Added inside the sidebar, below other content.',
          },
          {
            name: 'main-content',
            description: 'The main content section. Many times a simple &gt;router-outlet main-content>&gt;/router-outlet> is all thats needed here',
          }
        ]
        }
      ]
    };
  }

}`
  };
  multiDataTemp = {
    language: 'markup',
    code: `<cbj-datatable [options]="dtOptions"></cbj-datatable>`
  };
  apiDtOptions: DatatableOptions;


  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.apiDtOptions = {
      title: 'API',
      cardClasses: 'bg-secondary',
      columns: [
        {name: 'Name', data: 'name', flex: 1},
        {name: 'Type', flex: 1, data: (row) => {
            if (row.link) {
              return this.sanitizer.bypassSecurityTrustHtml(`<a href="${row.link}">${row.type}</a>`);
            }
            return `${row.type}`;
          }
        },
        {name: 'Description', data: 'description', flex: 2}
      ],
      data: [
        {
          name: 'options',
          type: 'DatatableOptions',
          link: '/models/datatables-options',
          description: 'The tables configuration object. See the Models section for more details',
        }
      ]
    };
  }

}
