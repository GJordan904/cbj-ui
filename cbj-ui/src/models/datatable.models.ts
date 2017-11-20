export interface DatatableOptions {
  columns?: any;
  data: any;
  title?: string;
  classes?: string;
  serverSide?: boolean;
  multiData?: boolean;
}

export interface DatableColumn {
  name: string;
  data: string | Function;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  sortOrd?: string;
}

export interface DatatableMultiData {
  name: string;
  data: string | Array<any>;
}

