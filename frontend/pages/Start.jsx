import React from 'react'
import{ Link } from 'react-router-dom'
import { useEffect } from "react";



const Start = () => {
    useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          console.log("✅ Location permission granted (or cached).");
        },
        (err) => {
          console.warn("⚠️ Location permission denied:", err);
        }
      );
    }
  }, []);
    return (
        <div>

            <div className=" bg-cover bg-center bg-[url('images/traffic_light.jpg')] h-screen pt-8  w-full flex justify-between flex-col" >
                 <img className=' w-16 ml-8 '  src="public\images\uber.png" alt="" />
                <div className='bg-white  py-4 px-4 rounded-t-lg w-96 mx-auto mt-20 shadow-lg'>
                    <h2 className='text-3xl font-bold'>Get started with Uber</h2>
                    <Link to='/login' className=' flex items-cenetr justify-center w-full bg-black text-white py-3 rounded-md  mt-5'>Continue</Link>
                </div>
            </div>

        </div>
    )
}

export default Start