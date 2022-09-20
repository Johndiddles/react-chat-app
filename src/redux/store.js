import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import chatsReducer from "./chatsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    allChats: chatsReducer,
  },
});
