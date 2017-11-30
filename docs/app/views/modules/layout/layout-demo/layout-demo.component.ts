import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DatatableOptions} from '@codebyjordan/ui';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-layout-demo',
  templateUrl: './layout-demo.component.html',
  styleUrls: ['./layout-demo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutDemoComponent implements OnInit {
  baseTempHighlightOpt = {
    language: 'markup',
    code: `<div class="site-wrapper">
    <div class="row m-0">
        <nav class="navbar" [ngClass]="navbarClasses">
            <div class="navbar-brand">
                <!-- Menu Toggler -->
                <ng-content select="[navbar-brand]"></ng-content>
            </div>
            <ng-content select="[navbar-content]"></ng-content>
        </nav>
    </div>

    <div class="site-inner">

        <nav *ngIf="useSidebar" class="cbj-sidebar" [ngClass]="{open: sidebarOpen}">

            <ng-content select="[sidebar-header]"></ng-content>

            <!-- SideBarLinks -->

            <ng-content select="[sidebar-footer]"></ng-content>

        </nav>

        <div class="main-content" [ngClass]="{open: sidebarOpen}">

            <ng-content select="[main-content]"></ng-content>

        </div>

    </div>
</div>`
  };
  compHighlightOpt = {
    language: 'typescript',
    code: `import { Component } from '@angular/core';
import { SidebarLinks, SidebarLinkTypes } from '@codebyjordan/ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sidebarLinks: SidebarLinks = {
    activeClass: 'active',
    links: [
      { link: '/home', text: 'Home', type: SidebarLinkTypes.LINK },
      { link: '/getting-started', text: 'Getting Started', type: SidebarLinkTypes.LINK },

      { text: 'Modules', type: SidebarLinkTypes.HEADING },
      { text: 'Cards', type: SidebarLinkTypes.DROPDOWN, dropdownShow: false, children: [
          { link: '/cards/card-tabs', text: 'Card Tabs', type: SidebarLinkTypes.LINK},
        ]
      },
      { text: 'Datatable', type: SidebarLinkTypes.DROPDOWN, dropdownShow: false, children: [
        { link: '/datatable/component', text: 'Datatable Component', type: SidebarLinkTypes.LINK},
      ]
      },
      { text: 'Layout', type: SidebarLinkTypes.DROPDOWN, dropdownShow: false, children: [
        { link: '/layout/component', text: 'Layout Component', type: SidebarLinkTypes.LINK},
      ]
      },
      { text: 'Menu', type: SidebarLinkTypes.DROPDOWN, dropdownShow: false, children: [
        { link: '/menu/component', text: 'Menu Component', type: SidebarLinkTypes.LINK},
      ]
      },
      { text: 'Pipes', type: SidebarLinkTypes.DROPDOWN, dropdownShow: false, children: [
        { link: '/pipes/bytes-transform', text: 'Bytes Transform', type: SidebarLinkTypes.LINK},
      ]
      },
      { text: 'Ripple', type: SidebarLinkTypes.DROPDOWN, dropdownShow: false, children: [
        { link: '/ripple/directive', text: 'Ripple Directive', type: SidebarLinkTypes.LINK},
      ]
      },
      { text: 'Scroll', type: SidebarLinkTypes.DROPDOWN, dropdownShow: false, children: [
        { link: '/scroll/el-in-view', text: 'Element InView', type: SidebarLinkTypes.LINK},
        { link: '/scroll/anim-in-view', text: 'Animate InView', type: SidebarLinkTypes.LINK},
      ]
      },
      { text: 'Services', type: SidebarLinkTypes.HEADING },
      { link: '/services/scroll-service', text: 'Scroll Service', type: SidebarLinkTypes.LINK},
      { text: 'Models', type: SidebarLinkTypes.HEADING },
      { link: '/models/1', text: 'Datatable', type: SidebarLinkTypes.LINK},
      { link: '/models/2', text: 'Layout', type: SidebarLinkTypes.LINK},
      { link: '/models/3', text: 'Menu', type: SidebarLinkTypes.LINK},
      { link: '/models/4', text: 'Scroll', type: SidebarLinkTypes.LINK},
    ]
  };
}`
  };
  tempHighlightOpt = {
    language: 'markup',
    code: `<cbj-layout [useSidebar]="true" navbarClasses="navbar-dark bg-primary" [sidebarLinks]="sidebarLinks">

    <a navbar-brand class="d-inline-flex align-items-center ml-3" routerLink="/home">
        <img src="/assets/img/ui-sm.png" class="d-inline-block" alt="cbj-ui logo">
    </a>

    <img sidebar-header class="bg-primary" width="100%" height="auto"  src="/assets/img/ui-lg.png">

    <router-outlet main-content></router-outlet>

</cbj-layout>`
  };
  dtOptions: DatatableOptions;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.dtOptions = {
      title: 'API',
      multiData: true,
      cardClasses: 'bg-secondary',
      columns: [
        [
          {name: 'Name', data: 'name', flex: 1},
          {
            name: 'Type', flex: 1, data: (row) => {
            if (row.link) {
              return this.sanitizer.bypassSecurityTrustHtml(`<a href="${row.link}">${row.type}</a>`);
            }
            return `${row.type}`;
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

}
