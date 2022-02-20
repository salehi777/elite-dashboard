export interface IColumn {
  key: any;
  title: string | JSX.Element;
  sortKey?: string;
  render: (record: any) => JSX.Element;
}

export interface ISelectableItem {
  all: boolean;
  empty: boolean;
  records: any[];
}

export interface SortObject {
  type: string | undefined;
  by: string | undefined;
}

export interface ApiParams {
  page: number;
  search: string;
  sort_type: string | undefined;
  sort_by: string | undefined;
}

export type TableHeaderProps = {
  search: string;
  showSearch?: boolean;
  buttons?: JSX.Element[];
  setSearch: (search: string) => void;
};

export type BaseTableProps = {
  data: any[] | undefined;
  isLoading: boolean;
  columns: IColumn[];
  gridTemplateColumns: string;
  sort: SortObject;
  setSort: (sort: SortObject) => void;
  selectable?: any;
  rowKey?: string;
  onRowClick?: (record: any) => void;
};

export type TableProps = {
  name: string;
  api: (params: ApiParams) => Promise<any>;
  beforeSend?: (params: {}) => {};
  afterReceive?: (res: any) => void;
  reload?: boolean;
  columns: IColumn[];
  gridTemplateColumns: string;
  selectable?: any;
  rowKey?: string;
  showSearch?: boolean;
  buttons?: JSX.Element[];
  onRowClick?: (record: any) => void;
};

export type PaginationProps = {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  onPageChange?: (page: number) => void;
};
