import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: {
      reducer(state, action) {
        state.name = action.payload;
      },
      prepare(name) {
        return {
          payload: name,
        };
      },
    },
  },
});

export const getUserName = (state) => state.user.name;

export const { createUser } = userSlice.actions;

export default userSlice.reducer;
