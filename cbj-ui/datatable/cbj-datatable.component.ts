import {Component, Input, OnInit} from '@angular/core';
import {DatableColumn, DatatableOptions, MenuItem} from '../models';
import {HttpClient} from '@angular/common/http';

const DEFAULTS = {
  title: 'Table',
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
  columns: Array<DatableColumn> = [];
  rows: Array<any> = [];
  menuItems:  Array<MenuItem> = [

  ];
  private multiData: any;
  private multiColumns: Array<Array<DatableColumn>>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.config = {
      ...DEFAULTS,
      ...this.options
    };
    this.initCols();
    this.initRows();
  }

  private initCols() {
    if (this.config.multiData) {
      for (const col of (<DatableColumn[]>this.config.columns[0])) {
        this.pushCol(col);
      }
      this.multiColumns = (<DatableColumn[][]>this.config.columns);
      this.multiData = this.config.data;
      this.initMenu();
    } else {
      for (const col of (<DatableColumn[]>this.config.columns)) {
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

  private dumpCols() {
    for (const col of this.columns) {
      this.columns.pop();
    }
  }

  private dumpRows() {
    for (const row of this.rows) {
      this.rows.pop();
    }
  }

  private setAjaxRows(url: string) {
    this.http.get(url).subscribe((resp: any) => {
      this.rows = resp.data;
    });
  }

  pushCol(col: DatableColumn) {
    this.columns.push({
      name: col.name,
      data: col.data,
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
    this.columns = this.multiColumns[item.id];
    if (typeof this.config.data[item.id].data === 'string')  {
      this.setAjaxRows(this.config.data[item.id].data);
    } else {
      this.rows = this.config.data[item.id].data;
    }
  }
}
