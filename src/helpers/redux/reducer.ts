import { combineReducers } from "@reduxjs/toolkit";
import { createUserReducer } from "../../Model/user";

export const getReducer = () => combineReducers({
    user: createUserReducer()
});