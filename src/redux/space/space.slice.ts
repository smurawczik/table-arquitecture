import { createSlice } from "@reduxjs/toolkit";
import { spaceThunks } from "./space.thunks";
import { SpaceSliceState } from "./space.types";

const initialState: SpaceSliceState = {
  columnDefs: [],
  data: [],
  defaultColDef: [],
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
  },
});

// Action creators are generated for each case reducer function
export const { actions: spaceSliceActions } = spaceSlice;

export default spaceSlice.reducer;
