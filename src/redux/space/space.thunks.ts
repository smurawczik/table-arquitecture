import { createAsyncThunk } from "@reduxjs/toolkit";
import { TableState } from "../shared/table.types";
import { AppDispatch, RootState } from "../store";

export const spaceThunks = {
  setTitle: createAsyncThunk(
    "space/setTitle",
    // if you type your function argument here
    async () => {
      const promptTitle = (await prompt("space title", "space")) ?? "space";
      return promptTitle;
    }
  ),
  goToBuilder: createAsyncThunk<
    | {
        shouldUpdateFromServer: true;
        clientData?: TableState["tableState"]["data"];
      }
    | {
        shouldUpdateFromServer: false;
        clientData: TableState["tableState"]["data"];
      },
    TableState["tableState"]["data"],
    {
      dispatch: AppDispatch;
      state: RootState;
    }
  >("builder/goToSpace", (data) => {
    return {
      shouldUpdateFromServer: false,
      clientData: data,
    };
  }),
};
