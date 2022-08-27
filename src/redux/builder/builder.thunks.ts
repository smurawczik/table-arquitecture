import { createAsyncThunk } from "@reduxjs/toolkit";
import { TableState } from "../shared/table.types";
import { AppDispatch, RootState } from "../store";

export const builderThunks = {
  goToSpace: createAsyncThunk<
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
