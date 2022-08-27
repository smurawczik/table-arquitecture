import { createSlice } from "@reduxjs/toolkit";
import { builderThunks } from "../builder/builder.thunks";
import {
  createColumnsFromData,
  createData,
  tableThunks,
} from "../shared/table.thunks";
import { spaceThunks } from "./space.thunks";
import { SpaceSliceState } from "./space.types";

const initialState: SpaceSliceState = {
  columnDefs: [],
  data: [],
  defaultColDef: {
    sortable: true,
    editable: true,
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
      state.data = action.payload;
    });

    builder.addCase(
      tableThunks.createColumnsFromData.fulfilled,
      (state, action) => {
        state.columnDefs = action.payload;
      }
    );

    builder.addCase(builderThunks.goToSpace.fulfilled, (state, action) => {
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
export const { actions: spaceSliceActions } = spaceSlice;

export default spaceSlice.reducer;
