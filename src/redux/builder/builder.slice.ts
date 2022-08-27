import { BuilderSliceState } from "./builder.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createColumnsFromData,
  createData,
  tableThunks,
} from "../shared/table.thunks";
import { spaceThunks } from "../space/space.thunks";

const initialState: BuilderSliceState = {
  columnDefs: [],
  data: [],
  defaultColDef: {
    sortable: true,
    editable: true,
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
      state.data = action.payload;
    });
    builder.addCase(
      tableThunks.createColumnsFromData.fulfilled,
      (state, action) => {
        state.columnDefs = action.payload;
      }
    );
    builder.addCase(spaceThunks.goToBuilder.fulfilled, (state, action) => {
      if (action.payload.shouldUpdateFromServer) {
        state.data = createData();
      } else {
        state.data = action.payload.clientData;
      }
      state.columnDefs = createColumnsFromData(state.data);
    });
  },
});

// Action creators are generated for each case reducer function
export const { actions: builderSliceActions } = builderSlice;

export default builderSlice.reducer;
