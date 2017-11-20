import {Component, Input, OnInit, SecurityContext} from '@angular/core';
import {DatableColumn, DatatableMultiData, DatatableOptions} from '../models/datatable.models';
import {HttpClient} from '@angular/common/http';

const DEFAULTS = {
  title: 'Table',
  serverSide: false,
  multiData: false,
  classes: 'table table-hover'
};

@Component({
  selector: 'cbj-datatable',
  templateUrl: './datatable.component.html'
})
export class DatatableComponent implements OnInit {
  @Input('options')options: DatatableOptions;
  config: DatatableOptions;
  columns: Array<DatableColumn> = [];
  rows: Array<any> = [];
  private multiData: Array<DatatableMultiData>;
  private multiColumns: Array<Array<DatableColumn>>;
  private multiDataCount = 0;

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
      this.columns = this.config.columns[0];
      this.multiColumns = this.config.columns;
    } else {
      this.columns = this.config.columns;
    }
  }

  private initRows() {
    if (typeof this.config.data === 'string') {
      this.http.get(this.config.data).subscribe((resp: any) => {
        if (this.config.multiData) {
          this.rows = resp.data[0];
          this.multiData = resp.data;
        }else {
          this.rows = resp.data;
        }
      });
    }else {
      if (this.config.multiData) {
        this.rows = this.config.data[0].data;
        this.multiData = this.config.data;
      }else {
        this.rows = this.config.data;
      }
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

  pushCol(col: DatableColumn) {
    this.columns.push({
      name: col.name,
      data: col.data,
      sortable: col.sortable === undefined ? true : col.sortable,
      filterable: col.filterable === undefined ? true : col.filterable,
      searchable: col.searchable === undefined ? true : col.searchable,
      sortOrd: col.sortOrd ? col.sortOrd : 'asc'
    });
  }

  isString(subject: any): boolean {
    return typeof subject === 'string';
  }

  changeData(index: number) {

  }
}
