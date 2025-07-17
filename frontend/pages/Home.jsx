import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VechilePanel from '../components/VechilePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDiver from '../components/LookingForDiver';
import WaitingForDriver from '../components/WaitingForDriver';

const home = () => {
  const [pickup, setPickup] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [panelOpen, setPanelOpen] = React.useState(false);
  const [vechilePanel, setVechilePanel] = React.useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = React.useState(false);
  const [vechileFound, setVechileFound] = React.useState(false);
  const [waitingPanel, setWaitingPanel] = React.useState(false);

  const waitingPanelRef = useRef(null);
  const vechileFoundRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vechilePanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();
  }
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current,
        {
          height: "70%",
          padding: "24px 0",
          display: "block"

        });
      gsap.to(panelCloseRef.current, { opacity: 1 });

    }
    else {
      gsap.to(panelRef.current,
        {
          height: "0",
          padding: "0",
          display: "none"

        });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }

  }, [panelOpen]);

  useGSAP(() => {
    if (vechilePanel) {
      gsap.to(vechilePanelRef.current, {
        translateY: "0"
      });
    }
    else {
      gsap.to(vechilePanelRef.current, {
        translateY: "100%"
      });
    }
  }, [vechilePanel]);
  // For confirm ride panel
  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        translateY: "0"
      });
    }
    else {
      gsap.to(confirmRidePanelRef.current, {
        translateY: "100%"
      });
    }
  }, [confirmRidePanel]);
  useGSAP(() => {
    if (vechileFound) {
      gsap.to(vechileFoundRef.current, {
        translateY: "0"
      });
    }
    else {
      gsap.to(vechileFoundRef.current, {
        translateY: "100%"
      });
    }
  }, [vechileFound]);
  useGSAP(() => {
    if (waitingPanel) {
      gsap.to(waitingPanelRef.current, {
        translateY: "0"
      });
    }
    else {
      gsap.to(waitingPanelRef.current, {
        translateY: "100%"
      });
    }
  }, [waitingPanel]);
  return (
    <div className='flex flex-col h-screen relative overflow-hidden'>
      <img className=' w-16 absolute left-5 top-5 ' src="images\uber.png" alt="" />
      <div className='h-screen w-screen '>
        {/* image for temprary use */}
        <img className='h-full w-full object-cover' src="images/map.png" alt="" />
      </div>
      <div className=' h-screen flex flex-col  justify-end absolute top-0 w-full '>
        <div className=' h-[30%] bg-white p-5 relative '>
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }
            }
            className=' absolute right-2 top-6 text-2xl' >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form action="" onSubmit={(e) => {
            submitHandler(e);
          }

          } >
            <div className="line h-20 w-1 top-[43%] left-10  absolute bg-gray-700 rounded-full  "></div>
            <input type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              required
              onClick={() => {
                setPanelOpen(true);
              }
              }
              placeholder='Enter your pickup location'
              className='bg-[#eee] text-base w-full rounded-lg py-2 px-12 mt-5' />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => {
                setPanelOpen(true);
              }}
              required
              placeholder='Enter your destination'
              className='bg-[#eee] text-base w-full  rounded-lg py-2 px-12 mt-5' />
          </form>
        </div>
        <div ref={panelRef} className=' bg-white '>

          <LocationSearchPanel setPanelOpen={setPanelOpen} setVechilePanel={setVechilePanel} />

        </div>
      </div>
      <div ref={vechilePanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
        <VechilePanel setConfirmRidePanel={setConfirmRidePanel} setVechilePanel={setVechilePanel} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVechileFound={setVechileFound} />
      </div>
      <div ref={vechileFoundRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
        <LookingForDiver setConfirmRidePanel={setConfirmRidePanel} setVechilePanel={setVechilePanel} setVechileFound={setVechileFound} setWaitingPanel={setWaitingPanel} />
      </div>
      <div ref={waitingPanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
        <WaitingForDriver setWaitingPanel={setWaitingPanel} />
      </div>

    </div>
  )
}

export default home