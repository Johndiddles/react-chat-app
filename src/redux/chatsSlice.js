import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
};

const chatsSlice = createSlice({
  name: "allChats",
  initialState,
  reducers: {
    loadExistingChats: {
      reducer(state, action) {
        state.chats = action.payload;
      },
      prepare(chats) {
        return {
          payload: chats,
        };
      },
    },
    addChat: {
      reducer(state, action) {
        // update chats in state
        state.chats = [...state.chats, action.payload];

        // store chat in localStorage

        let chatsInDb = localStorage?.chats;
        let parsedchatsInDb = chatsInDb ? JSON.parse(chatsInDb) : [];
        parsedchatsInDb = [...parsedchatsInDb, action.payload];
        localStorage.setItem("chats", JSON.stringify(parsedchatsInDb));
      },
      prepare(chats) {
        return {
          payload: chats,
        };
      },
    },
  },
});
console.log({ initialState });

export const getAllChats = (state) => state.allChats.chats;

export const { loadExistingChats, addChat } = chatsSlice.actions;

export default chatsSlice.reducer;
