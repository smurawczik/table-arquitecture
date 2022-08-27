import { AgGridReact } from "ag-grid-react";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { CellClickedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { TableState } from "../../../redux/shared/table.types";

export const Table: FC<TableState> = ({ columnDefs, data, defaultColDef }) => {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<any>(data);

  useEffect(() => {
    setRowData(data);
  }, [data]);

  useEffect(() => {
    _setColumnDefs(columnDefs);
  }, [columnDefs]);

  // Each Column Definition results in one Column.
  const [_columnDefs, _setColumnDefs] =
    useState<AgGridReact["props"]["columnDefs"]>(columnDefs);

  const cellClickedListener = useCallback((event: CellClickedEvent) => {
    console.log("cellClicked", event);
  }, []);

  return (
    <div>
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ width: "100%", height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={_columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          onCellClicked={cellClickedListener}
        />
      </div>
    </div>
  );
};
