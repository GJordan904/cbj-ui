export interface DatatableOptions {
  data: string | any[] | DatatableMultiData[];
  columns: DatableColumn[] | DatableColumn[][];
  title?: string;
  classes?: string;
  cardClasses?: string;
  serverSide?: boolean;
  multiData?: boolean;
}

export interface DatableColumn {
  name: string;
  data: string | Function;
  flex?: number;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  sortOrd?: string;
  sorted?: boolean;
}

export interface DatatableMultiData {
  name: string;
  data: string | Array<any>;
}

