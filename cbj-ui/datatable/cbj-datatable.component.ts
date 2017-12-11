import {Component, HostListener, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {DatatableColumn, DatatableMultiData, DatatableOptions, MenuItem} from '../models';
import {HttpClient} from '@angular/common/http';
import {ScrollService, WINDOW} from '../services';
import {collapse} from '../animations';
import {Subject} from 'rxjs/Subject';

const DEFAULTS = {
  serverSide: false,
  multiData: false,
  classes: '',
  cardClasses: '',
  rowsPerPage: 10
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
  pageNum = 1;


  private multiData: DatatableMultiData[];
  private multiColumns: DatatableColumn[][];
  private unsubscribe: Subject<void> = new Subject();

  constructor(private http: HttpClient,
              private scroll: ScrollService,
              @Inject(WINDOW) private window: Window) { }

  ngOnInit() {
    this.config = {
      ...DEFAULTS,
      ...this.config
    };
    this.initCols();
    this.initRows();
    this.measure();
    this.scroll.resizeObs.takeUntil(this.unsubscribe).subscribe(this.measure);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private measure = () => {
    this.wWidth = this.window.innerWidth;
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
      this.setAjaxRows(this.config.data);
    }else {
      if (this.config.multiData) {
        if (typeof this.config.data[0].data === 'string')  {
          this.setAjaxRows(this.config.data[0].data);
        } else {
          this.rows = this.config.data[0].data;
          this.initVisibleRows();
        }
      }else {
        this.rows = this.config.data;
        this.initVisibleRows();
      }
    }
  }

  private initVisibleRows() {
    this.visibleRows = [];
    const count = this.config.rowsPerPage > this.rows.length ? this.rows.length : this.config.rowsPerPage;
    for (let i = 0; i < count; i++) {
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

  private setAjaxRows(url: string) {
    this.http.get(url).subscribe((resp: any) => {
      this.rows = resp.data;
      this.initVisibleRows();
    });
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
      this.setAjaxRows(this.config.data[item.id].data);
    } else {
      this.rows = this.config.data[item.id].data;
    }
  }
}
