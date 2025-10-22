import axios from 'axios';
const fetchFare = async (pickupLocation, dropLocation) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/rides/get-fares`,
        {
          params: {
            pickupLocation: pickupLocation,
            dropLocation: dropLocation
          },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      return response.data.fare;
    } catch (err) {
      throw new Error('Error fetching fare details: ' + err.message);
    }
  };

  export default fetchFare;