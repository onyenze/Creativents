import { configureStore } from "@reduxjs/toolkit";
import { eventReducers } from "./State";

export const store = configureStore({
    // name:"Creativent",
    reducer : {
        events:eventReducers.reducer
    }
})