  import { setLiveRoute } from "../slices/locationSlice.js";
  import axios from "axios";

  export const liveLocation = async (rideDetail, captain, dropLocation) => {
    try {
      console.log(rideDetail, captain)
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/rides/live-route`, {
        rideId: rideDetail._id,
        captainId: captain._id,
        dropLocation: dropLocation
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      console.log("Live route data:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching live location:", error);
      return null;
    }

  }