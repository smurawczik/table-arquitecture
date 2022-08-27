import { createAsyncThunk } from "@reduxjs/toolkit";
import { TableState } from "../shared/table.types";
import { AppDispatch, RootState } from "../store";

export const builderThunks = {
  goToSpace: createAsyncThunk<
    | {
        shouldUpdateFromServer: true;
        clientData?: TableState["data"];
      }
    | {
        shouldUpdateFromServer: false;
        clientData: TableState["data"];
      },
    TableState["data"],
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
