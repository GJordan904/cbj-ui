import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DatatableColumn, DatatableMultiData, DatatableOptions} from './cbj-datatable.models';
import {MenuItem} from '../menu';
import {HttpClient} from '@angular/common/http';
import {ScrollbarService, WindowService} from '../@codebyjordan/scrollbar';
import {collapse} from '../animations';
import {Subject} from 'rxjs/Subject';

const DEFAULTS: DatatableOptions = {
  data: null,
  columns: null,
  serverSide: false,
  multiData: false,
  classes: '',
  cardClasses: '',
  rowsPerPage: 10,
  paging: false,
  filtering: false,
  sorting: false,
  searching: false,
};

@Component({
  selector: 'cbj-datatable',
  templateUrl: './cbj-datatable.component.html',
  animations: [collapse(250, 'ease-in-out')]
})
export class CbjDatatableComponent implements OnInit, OnDestroy {
  @Input('config')config: DatatableOptions;
  menuItems:  MenuItem[];
  wWidth: number;
  colsHidden: boolean;

  columns: DatatableColumn[] = [];
  rows = [];
  visibleRows = [];
  pageNum = 0;
  pageCount = 1;


  private multiData: DatatableMultiData[];
  private multiColumns: DatatableColumn[][];
  private unsubscribe: Subject<void> = new Subject();

  constructor(private http: HttpClient,
              private scroll: ScrollbarService,
              private ws: WindowService) { }

  ngOnInit() {
    this.config = {
      ...DEFAULTS,
      ...this.config
    };
    this.initCols();
    this.initRows();
    this.measure();
    this.ws.resizeObs.takeUntil(this.unsubscribe).subscribe(this.measure);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private measure = () => {
    this.wWidth = this.ws.width;
    this.colsHidden = false;
    for (const col of this.columns) {
      if (col.breakpoint) {
        col.hidden = col.breakpoint >= this.wWidth;
        if (col.hidden) {
          this.colsHidden = true;
        }
      }
    }
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
      this.setAjaxRows(this.config.data, 0);
    }else {
      if (this.config.multiData) {
        if (typeof this.config.data[0].data === 'string')  {
          this.setAjaxRows(this.config.data[0].data, 0);
        } else {
          this.rows = this.config.data[0].data;
          this.setPaging(0);
          this.initVisibleRows();
        }
      }else {
        this.rows = this.config.data;
        this.setPaging(0);
        this.initVisibleRows();
      }
    }
  }

  private initVisibleRows() {
    this.visibleRows = [];
    const count = this.config.paging ? this.config.rowsPerPage : this.rows.length;
    let offset = 0;
    if (this.config.paging) {
      offset = this.pageNum === 0 ? 0 : this.config.rowsPerPage * this.pageNum;
    }
    for (let i = offset; i < count; i++) {
      const row = this.rows[i];
      row.cbjState = 'closed';
      this.visibleRows.push(row);
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

  private setAjaxRows(url: string, pageNum: number) {
    this.http.get(url).subscribe((resp: any) => {
      this.rows = resp;
      this.setPaging(pageNum);
      this.initVisibleRows();
    });
  }

  private setPaging(pageNum: number) {
    if (this.rows.length > this.config.rowsPerPage && pageNum === 0) {
      this.config.paging = true;
      this.pageCount = Math.ceil(this.rows.length / this.config.rowsPerPage);
    }
    this.pageNum = pageNum;
  }

  pushCol(col: DatatableColumn) {
    this.columns.push({
      name: col.name,
      data: col.data,
      breakpoint: col.breakpoint === undefined ? undefined : col.breakpoint,
      keys: col.keys === undefined ? undefined : col.keys,
      flex: col.flex === undefined ? 1 : col.flex,
      sortable: col.sortable === undefined ? true : col.sortable,
      filterable: col.filterable === undefined ? true : col.filterable,
      searchable: col.searchable === undefined ? true : col.searchable,
      sortOrd: col.sortOrd ? col.sortOrd : 'asc',
      sorted: false,
      hidden: col.breakpoint === undefined ? false : col.breakpoint <= this.wWidth
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
      this.setAjaxRows(this.config.data[item.id].data, 0);
    } else {
      this.rows = this.config.data[item.id].data;
      this.setPaging(item.id);
      this.initVisibleRows();
    }
  }
}
