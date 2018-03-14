import { Component, HostBinding, OnInit } from '@angular/core';
import {DatatableOptions} from '@codebyjordan/ui';
import { basicComponent, basicTemplate, multiDataTemplate, multiDataComponent } from './demo-code';

@Component({
  selector: 'cbj-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  basicComp = basicComponent;
  basicTemp = basicTemplate;
  multiDataComp = multiDataComponent;
  multiDataTemp = multiDataTemplate;

  demoDtOptions: DatatableOptions;
  apiDtOptions: DatatableOptions;
  modelsDtOptions: DatatableOptions;

  constructor() { }

  ngOnInit() {
    this.demoDtOptions = {
      multiData: true,
      rowsPerPage: 5,
      columns: [
        [
          { name: 'ID', data: 'id', flex: .25 },
          { name: 'Username', data: 'username', flex: 1 },
          { name: 'First Name', data: 'first_name', flex: 1 },
          { name: 'Last Name', data: 'last_name', flex: 1, breakpoint: 992 },
          { name: 'Email', data: 'email', flex: 1, breakpoint: 992 },
        ],
        [
          { name: 'ID', data: 'id', flex: .5 },
          { name: 'User ID', data: 'user_id', flex: .5 },
          { name: 'Title', data: 'title', flex: 1 },
          { name: 'Body', data: 'description', flex: 2.5, breakpoint: 992 }
        ],
      ],
      data: [
        {name: 'Users', data: `api.codebyjordan.com/users/100`},
        {name: 'Comments', data: `api.codebyjordan.com/comments/50`}
      ]
    };
    this.apiDtOptions = {
      cardClasses: 'bg-secondary',
      columns: [
        { name: 'Attribute', data: 'name', flex: 1 },
        { name: 'Type', data: 'type', flex: 1 },
        { name: 'Description', data: 'description', flex: 2, breakpoint: 992 }
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
        { name: 'Type', data: 'type', flex: 1, breakpoint: 992 },
        { name: 'Description', data: 'description', flex: 2.5, breakpoint: 992 }
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
