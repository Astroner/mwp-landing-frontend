import { createAction } from "@reduxjs/toolkit";

export const addToken = createAction<{ token: string }>("@user/token/add");
export const setPreview = createAction<{ value: boolean }>("@user/isPreview/set");