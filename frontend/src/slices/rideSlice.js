import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   pickupLocation: null,
   dropLocation: null,
   vehicleType: null,
   vehicleImage: null,
   ride: {},
   fareDetail: null
};

const rideSlice = createSlice({
  name: "ride",
  initialState,
  reducers: {
    setRide: (state, action) => {
      state.ride = action.payload;
    },
    setFareDetail: (state, action) => {
      state.fareDetail = action.payload;
    },
    setPickupLocation: (state, action) => {
      state.pickupLocation = action.payload;
    },
    setDropLocation: (state, action) => {
      state.dropLocation = action.payload;
    },
    setVehicleType: (state, action) => {
      state.vehicleType = action.payload;
    },
    setVehicleImage: (state, action) => {
      state.vehicleImage = action.payload;
    },
  },
});

export const { setRide, setFareDetail, setPickupLocation, setDropLocation, setVehicleType, setVehicleImage } = rideSlice.actions;
export default rideSlice.reducer;
