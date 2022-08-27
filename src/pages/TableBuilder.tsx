import { Button, Chip, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { CellClickedEvent } from "ag-grid-community";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../components/Table";
import { builderThunks } from "../redux/builder/builder.thunks";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { tableThunks } from "../redux/shared/table.thunks";
import { TableState } from "../redux/shared/table.types";

export const TableBuilder = () => {
  const navigate = useNavigate();

  const defaultColDef = useAppSelector(
    (state) => state.builder.tableState.defaultColDef
  );
  const columnDefs = useAppSelector(
    (state) => state.builder.tableState.columnDefs
  );
  const data = useAppSelector((state) => state.builder.tableState.data);
  const tableId = useAppSelector((state) => state.builder.tableState.tableId);
  const shouldUpdate = useAppSelector(
    (state) => state.builder.tableState.shouldUpdateFromServer
  );
  const dispatch = useAppDispatch();

  const cellClickedListener = useCallback((event: CellClickedEvent) => {
    console.log("cellClicked", event);
  }, []);

  useEffect(() => {
    const makeTableStructure = async () => {
      if (shouldUpdate) {
        const { payload } = await dispatch(tableThunks.setTableData());
        dispatch(
          tableThunks.createColumnsFromData(
            payload as TableState["tableState"]["data"]
          )
        );
      }
    };

    makeTableStructure();
  }, [dispatch, shouldUpdate]);

  return (
    <div style={{ backgroundColor: red["200"], padding: "8px" }}>
      <Typography>
        <Chip label="Builder" color="secondary" />
      </Typography>
      <Button
        sx={{ m: 2 }}
        variant="contained"
        disableElevation
        color="secondary"
        onClick={() =>
          dispatch(builderThunks.goToSpace(data)).finally(() => {
            navigate("/space");
          })
        }
      >
        go to space
      </Button>
      <Table
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        data={data}
        tableId={tableId}
        onCellClicked={cellClickedListener}
      />
    </div>
  );
};
