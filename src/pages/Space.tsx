import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../components/Table";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { tableThunks } from "../redux/shared/table.thunks";
import { TableState } from "../redux/shared/table.types";
import { spaceThunks } from "../redux/space/space.thunks";

export const Space = () => {
  const navigate = useNavigate();

  const spaceTitle = useAppSelector((state) => state.space.title);

  const defaultColDef = useAppSelector(
    (state) => state.space.tableState.defaultColDef
  );
  const columnDefs = useAppSelector(
    (state) => state.space.tableState.columnDefs
  );
  const data = useAppSelector((state) => state.space.tableState.data);
  const tableId = useAppSelector((state) => state.space.tableState.tableId);
  const shouldUpdate = useAppSelector(
    (state) => state.space.tableState.shouldUpdateFromServer
  );
  const dispatch = useAppDispatch();

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
    <div style={{ backgroundColor: "#ccc", padding: "8px" }}>
      <span>
        <b>{spaceTitle}</b>
      </span>
      <Button
        sx={{ m: 2 }}
        variant="contained"
        disableElevation
        onClick={() => dispatch(spaceThunks.setTitle())}
      >
        Set Space Title
      </Button>
      <Button
        sx={{ m: 2 }}
        variant="contained"
        color="secondary"
        disableElevation
        onClick={() =>
          dispatch(spaceThunks.goToBuilder([])).finally(() => {
            navigate("/");
          })
        }
      >
        Open Builder
      </Button>
      <Table
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        data={data}
        tableId={tableId}
      />
    </div>
  );
};
