import React from 'react'
import { SocketContext } from '../../context/SocketContext';
import { liveLocation } from '../../utils/liveLocation.js';
import { setLiveRoute } from '../../slices/locationSlice.js';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiMapPin2Fill, RiMapPinUserFill, RiCurrencyLine } from 'react-icons/ri';

const RidePopUp = (props) => {
  // console.log('rideDetail in RidePopUp:', props.rideDetail);
  const Navigate = useNavigate();
  const captain = useSelector((state) => state.captain.captain);
  const rideDetail = useSelector((state) => state.ride.ride);
  const dispatch = useDispatch();
  const { sendMessage } = React.useContext(SocketContext);
  const handler = async () => {
    await props.confirmRide();
    try {
      const response = await liveLocation(rideDetail, captain, rideDetail.pickupLocation);
      console.log('Live route response:', response);
      dispatch(setLiveRoute(response));
      sendMessage('ride-accepted', { rideId: rideDetail._id, captainId: captain._id });
    } catch (error) {
      console.error('Error in accepting ride:', error);
    }
  }
  return (
    <>
      <h3 className='text-2xl font-bold mb-5' >New Ride for you</h3>
      <div className='flex justify-between items-center mt-4 p-2 rounded-lg bg-yellow-500'>
        <div className='flex justify-between items-center gap-3'>
          <img className='h-16 rounded-full w-16' src="/images/user.png" alt="" />
          <h2 className='text-lg font-medium '>{rideDetail?.user?.fullname?.firstname}</h2>
        </div>
        <h5>{rideDetail?.distance}</h5>
      </div>
      <div className='flex justify-between items-center flex-col' >
        <div className='w-full mt-5'>

          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
            <RiMapPin2Fill className="text-2xl" />
            <div>
              <h3 className='text-lg font-medium'>{rideDetail?.pickupLocation}</h3>
              <p className='text-sm -mt-1'>pickup Location</p>

            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
            <RiMapPinUserFill className="text-2xl" />
            <div>
              <h3 className='text-lg font-medium'>{rideDetail?.dropLocation}</h3>
              <p className='text-sm -mt-1'>drop Location</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 '>
            <RiCurrencyLine className="text-2xl" />
            <div>
              <h3 className='text-lg font-medium'>₹ {rideDetail?.fare}</h3>
              <p className='text-sm -mt-1'>cash cash</p>
            </div>
          </div>
        </div>
        <div className='flex item-center justify-between w-full mt-5 '>
          <button
            onClick={() => {
              Navigate('/captain/home');
            }}
            className=' bg-gray-300 text gray-700  font-semibold rounded-lg px-10 p-2'>ignore</button>
          <button
            onClick={handler}
            className=' bg-green-600 text-white font-semibold rounded-lg px-10 p-2'>Accept</button>

        </div>
      </div>
    </>
  )
}

export default RidePopUp