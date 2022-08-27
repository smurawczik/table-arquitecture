import { ColDef, ColGroupDef } from "ag-grid-community";

export interface TableComponentState {
  data: Record<string, string>[];
  defaultColDef: ColDef<Record<string, string>>;
  columnDefs:
    | (ColDef<Record<string, string>> | ColGroupDef<Record<string, string>>)[]
    | null;
  shouldUpdateFromServer?: boolean;
  tableId: string;
}

export interface TableState {
  tableState: TableComponentState;
}
