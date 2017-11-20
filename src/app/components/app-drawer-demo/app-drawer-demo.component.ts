import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DatatableOptions} from '../../../../cbj-ui/src/models/datatable.models';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-app-drawer-demo',
  templateUrl: './app-drawer-demo.component.html',
  styleUrls: ['./app-drawer-demo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppDrawerDemoComponent implements OnInit {
  compHighlightOpt = {
    language: 'typescript',
    code: `
import { Component } from '@angular/core';
import {SidebarLinks} from '@codebyjordan/ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sidebarLinks: SidebarLinks = {
    classes: 'list-group-item',
    activeClass: 'active',
    links: [
      { link: '/home', text: 'Home' },
      { link: '', text: 'Components', dropdown: true, dropdownShow: false, children: [
          { link: '/components/app-drawer', text: 'App Drawer'},
          { link: '/components/anim-in-view', text: 'Animate In View'},
          { link: '/components/card-tabs', text: 'Card Tabs'},
        ]
      },
      { link: '', text: 'Directives', dropdown: true, dropdownShow: false, children: [
        { link: '/directives/el-in-view', text: 'Element In View'},
      ]
      },
      { link: '', text: 'Services', dropdown: true, dropdownShow: false, children: [
        { link: '/services/scroll-service', text: 'Scroll Service'},
      ]
      },
      { link: '', text: 'Pipes', dropdown: true, dropdownShow: false, children: [
        { link: '/pipes/bytes-transform', text: 'Bytes Transform'},
      ]
      },
    ]
  };
}`
  };
  tempHighlightOpt = {
    language: 'markup',
    code: `
<cbj-app-container navbarClasses="navbar-dark bg-primary" [sidebarLinks]="sidebarLinks">

    <a navbar-brand class="d-inline-flex align-items-center" routerLink="/dashboard" href="#">
        <img src="/assets/img/logo-cloud.png" class="d-inline-block" alt="">
    </a>

    <router-outlet main-content></router-outlet>

</cbj-app-container>`
  };
  dtOptions: DatatableOptions;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.dtOptions = {
      title: 'API',
      multiData: true,
      columns: [
        [
          {name: 'Name', data: 'name'},
          {
            name: 'Type', data: (row) => {
            if (row.link) {
              return this.sanitizer.bypassSecurityTrustHtml(`<a href="${row.link}">${row.type}</a>`);
            }
            return `${row.type}`;
          }
          },
          {name: 'Description', data: 'description'}
        ],
        [
          { name: 'Name', data: 'name'},
          { name: 'Description', data: 'description'}
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
            name: '[navbar-brand]',
            description: 'Added inside the element with the navbar-brand class.',
          },
          {
            name: '[navbar-content]',
            description: 'Added inside the navbar, to the right of navbar-brand.',
          },
          {
            name: '[sidebar-header]',
            description: 'Added inside the sidebar, above all other content.',
          },
          {
            name: '[sidebar-footer]',
            description: 'Added inside the sidebar, below other content.',
          },
          {
            name: '[main-content]',
            description: 'The main content section. Many times a simple <router-outlet main-content></router-outlet> is all thats needed here',
          }
        ]
        }
      ]
    };
  }

}
