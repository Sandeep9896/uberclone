import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import rideReducer from "../slices/rideSlice";
import captainReducer from "../slices/captainSlice";
import locationReducer from "../slices/locationSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    ride: rideReducer,
    captain: captainReducer,
    location: locationReducer,
  },
});

export default store;
