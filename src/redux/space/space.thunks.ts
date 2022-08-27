import { createAsyncThunk } from "@reduxjs/toolkit";

export const spaceThunks = {
  setTitle: createAsyncThunk(
    "space/setTitle",
    // if you type your function argument here
    async () => {
      const promptTitle = (await prompt("space title", "space")) ?? "space";
      return promptTitle;
    }
  ),
};
