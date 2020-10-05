import { createReducer, Reducer } from "@reduxjs/toolkit";
import { addToken, setPreview } from "./action";
import { IUser } from "./types";

const initialState: IUser = {
    token: null
}

export const createUserReducer = (init: IUser = initialState): Reducer<IUser> => {
  return createReducer<IUser>(init, (builder) =>
    builder
      .addCase(addToken, (store, action) => ({
        ...store,
        token: action.payload.token,
      }))
      .addCase(setPreview, (store, action) => ({
        ...store,
        isPreview: action.payload.value
      }))
  );
};