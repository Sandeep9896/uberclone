import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmRidePanel = (props) => {
  const navigate = useNavigate();

  const [otp, setOtp] = React.useState("");


  const submitHandler = async (e) => {
    console.log("submitHandler called");
    e.preventDefault();

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/rides/start-ride`,
        {
          params: {   // ✅ use params instead of query
            rideId: props.rideDetail._id,
            otp: props.rideDetail.otp
          },
          headers: {  // ✅ put headers inside same object
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (res.data.success) {
        navigate('/captain-riding', { state: { rideDetail: props.rideDetail } });
      }
    } catch (error) {
      console.error("Error starting ride:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePopupPanel(false);
        }
        }
        className=' absolute  top-0 text-center w-[93%]  text-3xl' >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-bold mb-5' >Confirm this ride to start</h3>
      <div className='flex justify-between items-center mt-4 p-2 rounded-lg bg-yellow-500'>
        <div className='flex justify-between items-center gap-3'>
          <img className='h-16 rounded-full w-16' src="/images/user.png" alt="" />
          <h2 className='text-lg font-medium '>{props.rideDetail?.user?.fullname?.firstname}</h2>
        </div>
        <h5>{props.rideDetail?.distance}</h5>
      </div>
      <div className='flex justify-between items-center flex-col' >
        <div className='w-full mt-5'>

          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
            <i className="ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>{props.rideDetail?.pickupLocation}</h3>
              <p className='text-sm -mt-1'>pickup Location</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>{props.rideDetail?.dropLocation}</h3>
              <p className='text-sm -mt-1'>drop Location</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 '>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>{props.rideDetail?.fare}</h3>
              <p className='text-sm -mt-1'>fare </p>
            </div>
          </div>
        </div>
        <div className='mt-6 w-full'>
          <form className='flex flex-col gap-3'>
            <input
              type="number"
              placeholder='Enter OTP'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              minLength={6}
              maxLength={6}
              required
              className=' bg-[#eeee] text-mono rounded-md p-4 w-full '
            />
            <button
              onClick={(e) => {
                submitHandler(e);
              }}
              className='w-full  text-center bg-green-600 text-white font-semibold rounded-lg p-3'>Confirm</button>
            <button
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
                props.setRidePopupPanel(false);
              }}
              className='w-full  bg-red-500 text-white  font-semibold rounded-lg p-3'>Cancel</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePanel