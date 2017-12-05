import { Component, OnInit } from '@angular/core';
import {DatatableOptions, CbjLinkCellComponent} from '@codebyjordan/ui';

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
      data: '/api/get-users',
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
            description: 'The main content section. Many times a simple <router-outlet main-content></router-outlet> is all thats needed here',
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
  modelsDtOptions: DatatableOptions;


  constructor() { }

  ngOnInit() {
    this.apiDtOptions = {
      cardClasses: 'bg-secondary',
      columns: [
        { name: 'Attribute', data: 'name', flex: 1 },
        { name: 'Type', data: 'type', flex: 1 },
        { name: 'Description', data: 'description', flex: 2 }
      ],
      data: [
        {
          name: 'options',
          type: '<code class="p-1"><span class="token variable">DatableOptions</span></code>',
          description: 'The tables configuration object. See the Models table below for more details',
        }
      ]
    };

    this.modelsDtOptions = {
      multiData: true,
      cardClasses: 'bg-secondary',
      columns: [
        { name: 'Property', data: 'prop', flex: 1 },
        { name: 'Required', data: 'required', flex: .75 },
        { name: 'Type', data: 'type', flex: 1 },
        { name: 'Description', data: 'description', flex: 2.5 }
      ],
      data: [
        {
          name: 'DatatableOptions',
          data: [
            {
              prop: 'data',
              required: 'Yes',
              type: `<code class="p-1"><span class="token keyword">string</span> ||
<span class="token keyword">any</span>[] ||
<span class="token variable">DatatableMultiData</span>[]</code>`,
              description: `The data being passed into the table. If a string is passed, it is assumed to be a URL and 
                the table will initiate a GET request.`,
            },
            {
              prop: 'columns',
              required: 'Yes',
              type: `<code class="p-1"><span class="token variable">DatableColumn</span>[] || 
<span class="token variable">DatableColumn</span>[][]</code>`,
              description: `The tables column definitions. If passing in MultiData, you have the choice of either 
              passing a single array of columns that will be used for all the data or a separate array for each data source.`,
            },
            {
              prop: 'title',
              required: 'No',
              type: `<code class="p-1"><span class="token keyword">string</span></code>`,
              description: `Setting the title property will add the title inside an <code class="p-1"><span class="token tag">&lt;h4&gt;</span></code> tag just above the table. Setting the MultiData
                property to true and passing MultiData will override the title, replacing it with a dropdown menu`,
            },
            {
              prop: 'classes',
              required: 'No',
              type: `<code class="p-1"><span class="token keyword">string</span></code>`,
              description: `Classes to be applied to the table`,
            },
            {
              prop: 'cardClasses',
              required: 'No',
              type: `<code class="p-1"><span class="token keyword">string</span></code>`,
              description: `Classes to be applied to the card containing the table`,
            },
            {
              prop: 'serverSide',
              required: 'No',
              type: `<code class="p-1"><span class="token keyword">boolean</span></code>`,
              description: `This property lets the table know that all sorting and ordering will be done server side. 
              This feature has not been implemented yet.`,
            },
            {
              prop: 'multiData',
              required: 'No',
              type: `<code class="p-1"><span class="token keyword">boolean</span></code>`,
              description: `Flag indicating that MultiData is being passed. Setting this to true puts the table in 
              MultiData mode and it will then expect multiple data sources`,
            },
          ]
        },
        {
          name: 'DatableColumn',
          data: [
            {
              prop: 'name',
              required: 'Yes',
              type: `<code class="p-1"><span class="token keyword">string</span></code>`,
              description: `The name of the column, this property will be used as the header`,
            },
            {
              prop: 'data',
              required: 'Yes',
              type: `<code class="p-1"><span class="token keyword">string</span> || <span class="token variable">Component</span></code>`,
              description: `Either the property name to retrieve from the data source or a dynamic component to be resolved and passed the current row.`,
            },
            {
              prop: 'keys',
              required: 'No',
              type: `<code class="p-1"><span class="token keyword">string</span>[]</code>`,
              description: `If you use one of the pre-built CbjUi components for the columns data property then you will most likely
              need to set this property so the component knows what data to retrieve. If you build your own component this isn't
              necessary as you will know what data you need`,
            },
            {
              prop: 'flex',
              required: 'No',
              type: `<code class="p-1"><span class="token keyword">number</span></code>`,
              description: `The flex-grow property of the column`,
            },
            {
              prop: 'sortable',
              required: 'No',
              type: `<code class="p-1"><span class="token keyword">boolean</span></code>`,
              description: `Sets whether the column should be sortable`,
            },
            {
              prop: 'filterable',
              required: 'No',
              type: `<code class="p-1"><span class="token keyword">boolean</span></code>`,
              description: `Sets whether the column should be filterable`,
            },
            {
              prop: 'searchable',
              required: 'No',
              type: `<code class="p-1"><span class="token keyword">boolean</span></code>`,
              description: `Sets whether the column should be searchable`,
            },
            {
              prop: 'sortOrd',
              required: 'No',
              type: `<code class="p-1"><span class="token keyword">string</span></code>`,
              description: `The direction the column should be sorted. Either "asc" or "desc"`,
            },
            {
              prop: 'sorted',
              required: 'No',
              type: `<code class="p-1"><span class="token keyword">boolean</span></code>`,
              description: `Flag indicating whether the table is currently sorted by this column. You should not need 
              to set this property, it is for internal use`,
            },
          ]
        }
      ]
    };
  }

}
