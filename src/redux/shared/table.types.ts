import { ColDef, ColGroupDef } from "ag-grid-community";

export interface TableState {
  data: Record<string, string>[];
  defaultColDef: ColDef<Record<string, string>>;
  columnDefs:
    | (ColDef<Record<string, string>> | ColGroupDef<Record<string, string>>)[]
    | null;
  shouldUpdateFromServer?: boolean;
}
