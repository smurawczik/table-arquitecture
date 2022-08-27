import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CellClickedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export const Table = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<any>([]);

  // Each Column Definition results in one Column.
  const [columnDefs] = useState<AgGridReact["props"]["columnDefs"]>([
    { field: "make", filter: true },
    { field: "model", filter: true },
    { field: "price" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      editable: true,
    }),
    []
  );

  const cellClickedListener = useCallback((event: CellClickedEvent) => {
    console.log("cellClicked", event);
  }, []);

  // Example load data from sever
  useEffect(() => {
    setRowData([
      { make: "Porsche", model: "Boxter", price: 72000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
    ]);
  }, []);

  return (
    <div>
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ width: "100%", height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          onCellClicked={cellClickedListener}
        />
      </div>
    </div>
  );
};
