export interface DatatableOptions {
  data: string | any[] | DatatableMultiData[];
  columns: DatatableColumn[] | DatatableColumn[][];
  title?: string;
  classes?: string;
  cardClasses?: string;
  serverSide?: boolean;
  multiData?: boolean;
  rowsPerPage?: number;
  searching?: boolean;
  sorting?: boolean;
  filtering?: boolean;
  paging?: boolean;
}

export interface DatatableColumn {
  name: string;
  data: any;
  breakpoint?: number;
  keys?: string[];
  flex?: number;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  sortOrd?: string;
  sorted?: boolean;
  hidden?: boolean;
}

export interface DatatableMultiData {
  name: string;
  data: string | any[];
}

export interface ComponentCellOptions {
  row: any;
  component: any;
  keys: string[];
}


