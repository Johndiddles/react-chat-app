import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  inComingCount: 0,
};

const chatsSlice = createSlice({
  name: "allChats",
  initialState,
  reducers: {
    loadExistingChats: {
      reducer(state, action) {
        console.log("doing it");
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
        console.log("updating state");
        state.chats = [...state.chats, action.payload];

        // store chat in localStorage
        console.log("updating localStorage");
        let chatsInDb = localStorage?.chats;
        let parsedchatsInDb = chatsInDb ? JSON.parse(chatsInDb) : [];

        const foundChat = parsedchatsInDb.find(
          (chat) => chat.id === action.payload?.id
        );

        if (foundChat?.length === 0 || !foundChat) {
          // console.log("not found");
          parsedchatsInDb.push(action.payload);
          localStorage.setItem("chats", JSON.stringify(parsedchatsInDb));
        } else {
          // console.log("found");
        }
      },
      prepare(chats) {
        return {
          payload: chats,
        };
      },
    },
    increaseIncomingCount: {
      reducer(state, action) {
        state.inComingCount = state.inComingCount + 1;
      },
      prepare(inComingCount) {
        return {
          payload: inComingCount,
        };
      },
    },
  },
});
console.log({ initialState });

export const getAllChats = (state) => state.allChats.chats;
export const getIncomingCount = (state) => state.allChats.inComingCount;

export const { loadExistingChats, addChat, increaseIncomingCount } =
  chatsSlice.actions;

export default chatsSlice.reducer;
