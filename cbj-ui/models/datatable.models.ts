export interface DatatableOptions {
  data: string | any[] | DatatableMultiData[];
  columns: DatatableColumn[] | DatatableColumn[][];
  title?: string;
  classes?: string;
  cardClasses?: string;
  serverSide?: boolean;
  multiData?: boolean;
}

export interface DatatableColumn {
  name: string;
  data: any;
  keys?: string[];
  flex?: number;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  sortOrd?: string;
  sorted?: boolean;
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


