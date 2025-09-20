import React from 'react'
import { Link,useLocation } from 'react-router-dom';
import FinishRide from '../../components/captainComponents/FinishRide';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { RiArrowDownWideLine, RiMapPin2Fill, RiMapPinUserFill, RiCurrencyLine } from 'react-icons/ri';

const FinishRide = () => {
    const location = useLocation();
    const { rideDetail } = location.state || {};

    const [finishRidePanel, setFinishRidePanel] = React.useState(false);
    const finishRidePanelRef = React.useRef(null);
    useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        translateY: "0"
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        translateY: "100%"
      });
    }
  },[finishRidePanel]);
    return (
        <div>

            <div className='h-screen w-full'>
                <div className='fixed w-full top-0 flex justify-between items-center p-5 '>
                    <img className=' w-16 ' src="images\uber.png" alt="" />
                    <Link to="/captains/logout" className='h-10 p-3 right-2 top-2 bg-white flex items-center justify-center rounded-full shadow-lg'>
                        <i className="tetx-lg font-medium ri-logout-box-r-line"></i>
                    </Link>
                </div>
                <div className='h-4/5 '>
                    <img className='h-full w-full object-cover' src="images/map.png" alt="" />
                </div>
                <div className='h-1/5 p-5 bg-yellow-400 flex relative justify-between items-center'>
                    <h5
                        onClick={() => {
                            props.setRidePopupPanel(false);
                        }
                        }
                        className=' absolute  top-0 text-center w-[93%]  text-3xl' >
                        <RiArrowDownWideLine />
                    </h5>
                    <h4 className='text-xl font-semibold'>4km away</h4>
                    <button
                        onClick={() => {
                            setFinishRidePanel(true);
                        }}
                     className=' bg-green-600 text-white font-semibold rounded-lg px-10 p-3' >Complete Ride</button>
                </div>
                <div ref={finishRidePanelRef}  className='fixed z-10   bottom-0 justify-between bg-white w-full px-3 py-6 pt-12'>
                    <FinishRide rideDetail={rideDetail} setFinishRidePanel={setFinishRidePanel} />
                </div>

            </div>
        </div>

    )
}

export default FinishRide;