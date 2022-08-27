import { BuilderSliceState } from "./builder.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createColumnsFromData,
  createData,
  tableThunks,
} from "../shared/table.thunks";
import { spaceThunks } from "../space/space.thunks";
import { DEFAULT_TABLE_ID } from "../shared/table.constants";

const initialState: BuilderSliceState = {
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
  dimensions: {
    column: [],
    row: [],
    inactive: [],
  },
  dimensionsByLine: {
    testVariable: {
      inactive: [],
      row: [],
    },
  },
};

export const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      console.log(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(tableThunks.setTableData.fulfilled, (state, action) => {
      state.tableState.data = action.payload;
    });
    builder.addCase(
      tableThunks.createColumnsFromData.fulfilled,
      (state, action) => {
        state.tableState.columnDefs = action.payload;
      }
    );
    builder.addCase(spaceThunks.goToBuilder.fulfilled, (state, action) => {
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
export const { actions: builderSliceActions } = builderSlice;

export default builderSlice.reducer;
