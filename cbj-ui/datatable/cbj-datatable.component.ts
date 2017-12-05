import {Component, Input, OnInit} from '@angular/core';
import {DatatableColumn, DatatableMultiData, DatatableOptions, MenuItem} from '../models';
import {HttpClient} from '@angular/common/http';

const DEFAULTS = {
  serverSide: false,
  multiData: false,
  classes: '',
  cardClasses: ''
};

@Component({
  selector: 'cbj-datatable',
  templateUrl: './cbj-datatable.component.html'
})
export class CbjDatatableComponent implements OnInit {
  @Input('options')options: DatatableOptions;
  config: DatatableOptions;
  menuItems:  MenuItem[];
  isMobile: boolean;

  columns: DatatableColumn[] = [];
  rows: any[] = [];

  private multiData: DatatableMultiData[];
  private multiColumns: DatatableColumn[][];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.measure();
    this.config = {
      ...DEFAULTS,
      ...this.options
    };
    this.initCols();
    this.initRows();
  }

  private measure() {
  }

  private initCols() {
    if (this.config.multiData) {
      if (this.config.columns[0] instanceof Array) {
        for (const col of <DatatableColumn[]>this.config.columns[0]) {
          this.pushCol(col);
        }
        this.multiColumns = <DatatableColumn[][]>this.config.columns;
      } else {
        for (const col of <DatatableColumn[]>this.config.columns) {
          this.pushCol(col);
        }
      }
      this.multiData = <DatatableMultiData[]>this.config.data;
      this.initMenu();
    } else {
      for (const col of <DatatableColumn[]>this.config.columns) {
        this.pushCol(col);
      }
    }
  }

  private initRows() {
    if (typeof this.config.data === 'string') {
      this.setAjaxRows(this.config.data);
    }else {
      if (this.config.multiData) {
        if (typeof this.config.data[0].data === 'string')  {
          this.setAjaxRows(this.config.data[0].data);
        } else {
          this.rows = this.config.data[0].data;
        }
      }else {
        this.rows = this.config.data;
      }
    }
  }

  private initMenu() {
    this.menuItems = [];
    let i = 0;
    for (const data of this.multiData) {
      this.menuItems.push({
        id: i,
        title: data.name,
        active: false,
        click: this.changeData
      });
      i++;
    }
  }

  private setAjaxRows(url: string) {
    this.http.get(url).subscribe((resp: any) => {
      this.rows = resp.data;
    });
  }

  pushCol(col: DatatableColumn) {
    this.columns.push({
      name: col.name,
      data: col.data,
      keys: col.keys === undefined ? undefined : col.keys,
      flex: col.flex === undefined ? 1 : col.flex,
      sortable: col.sortable === undefined ? true : col.sortable,
      filterable: col.filterable === undefined ? true : col.filterable,
      searchable: col.searchable === undefined ? true : col.searchable,
      sortOrd: col.sortOrd ? col.sortOrd : 'asc',
      sorted: false
    });
  }

  isString(subject: any): boolean {
    return typeof subject === 'string';
  }

  changeData = (item: any) => {
    if (this.config.columns[0] instanceof Array) {
      this.columns = this.multiColumns[item.id];
    }
    if (typeof this.config.data[item.id].data === 'string')  {
      this.setAjaxRows(this.config.data[item.id].data);
    } else {
      this.rows = this.config.data[item.id].data;
    }
  }
}
