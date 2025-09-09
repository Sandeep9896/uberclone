import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLocation:{
    lat: null,
    lng: null
  },
  captainLocation: {
    lat: null,
    lng: null
  }
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    setCaptainLocation: (state, action) => {
      state.captainLocation = action.payload;
    },
  },
});

export const { setUserLocation, setCaptainLocation } = locationSlice.actions;
export default locationSlice.reducer;
