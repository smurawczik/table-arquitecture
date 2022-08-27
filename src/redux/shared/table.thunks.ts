import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { TableState } from "./table.types";

export const createData = () => {
  let data: TableState["data"] = [];
  for (let i = 0; i < 50; i++) {
    const age = Math.round(Math.random() * 100).toString();
    data.push({
      name: `name ${age}`,
      lastName: "last anem",
      age,
    });
  }
  return data;
};

export function createColumnsFromData(data: Record<string, string>[]) {
  const dataKeys = Object.keys(data[0]);
  return dataKeys.map((key) => ({
    field: key,
    rowGroup: key === "age",
  }));
}

export const tableThunks = {
  createColumnsFromData: createAsyncThunk<
    TableState["columnDefs"],
    TableState["data"],
    {
      dispatch: AppDispatch;
      state: RootState;
    }
  >("shared/createColumnsFromData", (data) => {
    return createColumnsFromData(data);
  }),
  setTableData: createAsyncThunk<TableState["data"]>(
    "shared/setTableData",
    () => {
      return createData();
    }
  ),
};
