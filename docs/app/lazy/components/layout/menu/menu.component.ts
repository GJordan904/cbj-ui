import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@codebyjordan/ui';

@Component({
  selector: 'cbj-menu-d',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  headerMenu: MenuItem[] = [
    { id: 0, title: 'Item 1', active: true },
    { id: 1, title: 'Item 2', active: false },
    { id: 2, title: 'Item 3', active: false }
  ];
  constructor() { }

  ngOnInit() {
  }

}
