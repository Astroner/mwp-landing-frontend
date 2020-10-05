import { configureStore } from "@reduxjs/toolkit";

import { getReducer } from "./reducer";

export const getStore = () => {
    return configureStore({
      reducer: getReducer(),
    });
}

export type RootStore = ReturnType<ReturnType<typeof getStore>["getState"]>;