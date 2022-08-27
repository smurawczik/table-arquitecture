import { BuilderSliceState } from "./builder.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: BuilderSliceState = {
  columnDefs: [],
  data: [],
  defaultColDef: [],
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
});

// Action creators are generated for each case reducer function
export const { actions: builderSliceActions } = builderSlice;

export default builderSlice.reducer;
