import { configureStore } from "@reduxjs/toolkit";
import builderReducer from "./builder/builder.slice";
import spaceReducer from "./space/space.slice";

export const store = configureStore({
  reducer: {
    builder: builderReducer,
    space: spaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
