import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Auth:null,
  userLocation:{
    lat: null,
    lng: null
  },
  userLocationWatchId: null,
  captainLocationWatchId: null,
  coords: null,
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
    setUserLocationWatchId: (state, action) => {
      state.userLocationWatchId = action.payload;
    },
    setCaptainLocationWatchId: (state, action) => {
      state.captainLocationWatchId = action.payload;
    },
    setCoords: (state, action) => {
      state.coords = action.payload;
    },
    setAuth:(state, action)=>{
      state.Auth = action.payload;
    }
  },
});

export const { setUserLocation, setCaptainLocation, setUserLocationWatchId, setCaptainLocationWatchId,setCoords,setAuth } = locationSlice.actions;
export default locationSlice.reducer;
