import { Button } from "@mui/material";
import { red } from "@mui/material/colors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../components/Table";
import { builderThunks } from "../redux/builder/builder.thunks";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { tableThunks } from "../redux/shared/table.thunks";
import { TableState } from "../redux/shared/table.types";

export const TableBuilder = () => {
  const navigate = useNavigate();

  const defaultColDef = useAppSelector((state) => state.builder.defaultColDef);
  const columnDefs = useAppSelector((state) => state.builder.columnDefs);
  const data = useAppSelector((state) => state.builder.data);
  const shouldUpdate = useAppSelector(
    (state) => state.builder.shouldUpdateFromServer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const makeTableStructure = async () => {
      if (shouldUpdate) {
        const { payload } = await dispatch(tableThunks.setTableData());
        dispatch(
          tableThunks.createColumnsFromData(payload as TableState["data"])
        );
      }
    };

    makeTableStructure();
  }, [dispatch, shouldUpdate]);

  return (
    <div style={{ backgroundColor: red["200"], padding: "8px" }}>
      <span>This is a builder</span>
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
      />
    </div>
  );
};
