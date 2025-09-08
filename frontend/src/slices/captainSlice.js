import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  captain: null,
  isLoggedIn: false, 
};

const captainSlice = createSlice({
  name: "captain",
  initialState,
  reducers: {
    setCaptain: (state, action) => {
      state.captain = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
          state.captain = null;
          state.isLoggedIn = false;
        },
  },
});

export const { setCaptain, logout } = captainSlice.actions;
export default captainSlice.reducer;