import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { FC, useEffect, useRef, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import type { TableComponentState } from "../../../redux/shared/table.types";

interface TableInterface
  extends TableComponentState,
    Pick<AgGridReactProps, "datasource" | "onCellClicked"> {}

export const Table: FC<TableInterface> = ({
  columnDefs,
  data,
  defaultColDef,
  onCellClicked,
}) => {
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

  return (
    <div>
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ width: "100%", height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={_columnDefs}
          defaultColDef={defaultColDef}
          onRowGroupOpened={(event) => {
            console.log(event.node.getRoute());
          }}
          rowSelection="multiple"
          onCellClicked={onCellClicked}
        />
      </div>
    </div>
  );
};
