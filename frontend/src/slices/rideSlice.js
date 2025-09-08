import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ride:{} 
};

const rideSlice = createSlice({
  name: "ride",
  initialState,
  reducers: {
    setRide: (state, action) => {
      state.ride = action.payload;
    },
  },
});

export const { setRide } = rideSlice.actions;
export default rideSlice.reducer;
