import { createSlice } from "@reduxjs/toolkit";
import { builderThunks } from "../builder/builder.thunks";
import { DEFAULT_TABLE_ID } from "../shared/table.constants";
import {
  createColumnsFromData,
  createData,
  tableThunks,
} from "../shared/table.thunks";
import { spaceThunks } from "./space.thunks";
import { SpaceSliceState } from "./space.types";

const initialState: SpaceSliceState = {
  tableState: {
    columnDefs: [],
    data: [],
    defaultColDef: {
      sortable: true,
      editable: true,
    },
    tableId: DEFAULT_TABLE_ID,
    shouldUpdateFromServer: true,
  },
  title: "",
};

export const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(spaceThunks.setTitle.fulfilled, (state, action) => {
      state.title = action.payload;
    });

    builder.addCase(tableThunks.setTableData.fulfilled, (state, action) => {
      state.tableState.data = action.payload;
    });

    builder.addCase(
      tableThunks.createColumnsFromData.fulfilled,
      (state, action) => {
        state.tableState.columnDefs = action.payload;
      }
    );

    builder.addCase(builderThunks.goToSpace.fulfilled, (state, action) => {
      state.tableState.shouldUpdateFromServer =
        action.payload.shouldUpdateFromServer;
      if (action.payload.shouldUpdateFromServer) {
        state.tableState.data = createData();
      } else {
        state.tableState.data = action.payload.clientData;
      }
      state.tableState.columnDefs = createColumnsFromData(
        state.tableState.data
      );
    });
  },
});

// Action creators are generated for each case reducer function
export const { actions: spaceSliceActions } = spaceSlice;

export default spaceSlice.reducer;
