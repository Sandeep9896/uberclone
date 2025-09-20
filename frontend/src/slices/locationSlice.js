import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Auth: null,
  userLocation: {
    lat: null,
    lng: null
  },
  watchId: null,
  liveRoute: null,
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
    setLiveRoute: (state, action) => {
      state.liveRoute = action.payload;
    },
    setAuth: (state, action) => {
      state.Auth = action.payload;
    },
    setWatchId: (state, action) => {
      state.watchId = action.payload;
    }
  },
});

export const { setUserLocation, setCaptainLocation, setLiveRoute, setAuth, setWatchId } = locationSlice.actions;
export default locationSlice.reducer;
